import base64
import torch
from PIL import Image, ImageDraw, ImageFont
import numpy as np
from io import BytesIO
from yolov5.models.experimental import attempt_load
from yolov5.utils.general import non_max_suppression, scale_boxes
from yolov5.utils.augmentations import letterbox
from yolov5.utils.torch_utils import select_device


model = None
device = None
img_size = 640

def model_load(weights='yolov5s.pt'):
    global model, device
    device = select_device('')
    model = attempt_load(weights, 'cpu')
    model.eval()

def preprocess_image(image_1):
    image_in_bytes = base64.b64decode(image_1)
    image = Image.open(BytesIO(image_in_bytes))

    img = np.array(image)
    
    #Padding Images
    img = letterbox(img, new_shape=img_size)[0]
    img = img[:, :, ::-1].transpose(2, 0, 1)  # BGR to RGB
    img=img.copy()
    img = torch.from_numpy(img).to(device)
    img = img.float()  # uint8 to fp16/32
    img /= 255.0  # 0 - 255 to 0.0 - 1.0
    if img.ndimension() == 3:
        img = img.unsqueeze(0)

    return img,image


def detect_objects(image):
    if model is None:
        model_load()

    #Preprocessing
    img, original_image = preprocess_image(image)

    # Perform inference
    with torch.no_grad():
        detections = model(img)[0]
        detections = non_max_suppression(detections, conf_thres=0.5, iou_thres=0.5)

    # Process detections
    arr = []
    if detections is not None:
        for x in detections:
            if x is not None and len(x)>0:
                for y in x:
                    x1, y1, x2, y2, cls_conf, cls = y[:6]
                    arr.append({
                        'class': int(cls.item()),
                        'class_name': model.names[int(cls.item())],
                        'confidence': float(cls_conf.item()),
                        'box': [int(x1.item()), int(y1.item()), int(x2.item()), int(y2.item())]
                    })
                    # Draw bounding boxes on the processed image
                    draw = ImageDraw.Draw(original_image)
                    font = ImageFont.load_default()
                    draw.rectangle([x1, y1, x2, y2], outline='red', width=3)
                    text = f"{model.names[int(cls.item())]} {cls_conf.item():.2f}"  # Format text with class name and confidence
                    draw.text((x1, y1), text, fill='red',font=font)
    # Convert processed image to base64 string for display
    buffered = BytesIO()
    original_image.save(buffered, format="JPEG")
    processed_image = base64.b64encode(buffered.getvalue()).decode('utf-8')

    return arr, processed_image  # Return detected objects and processed image


