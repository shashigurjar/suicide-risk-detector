# 🧠 Suicide Risk Detector

A web-based AI application that analyzes user-submitted text to detect signs of suicidal intent using a machine learning model. The app predicts whether the text is **suicidal** or **not suicidal**, along with a risk level assessment (e.g., NONE, HIGH). Designed for awareness, not diagnosis.

---

## 🚀 Features

- 🔍 Real-time suicide risk detection from text input.
- 🤖 Backend powered by a trained deep learning model (.h5).
- 🖥️ Clean and intuitive React frontend.
- ⚡ Instant feedback on risk level: `NONE`, `MODERATE`, `HIGH`.

---

## 🛠️ Tech Stack

| Layer      | Tech                       |
|------------|----------------------------|
| Frontend   | React.js                   |
| Backend    | Python, Flask              |
| ML Model   | TensorFlow / Keras (`.h5`) |
| Styling    | CSS / Bootstrap            |

---

## ⚙️ Local Setup

### 1. Clone the repo

```bash
git clone https://github.com/shashigurjar/suicide-risk-detector.git
cd suicide-risk-detector
```
### 2. Start the backend (Flask + model)
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```
### 3. Start the frontend (React)
```bash
cd ../frontend
npm install
npm start
```
---
## 🧠 Model Info

- Trained on a labeled dataset of suicidal vs non-suicidal text.
- Uses Keras/TensorFlow and saved as model.h5.
- Can be replaced or retrained as needed.
  
---

## ⚠️ Disclaimer

This tool is not a replacement for professional mental health care. It is designed for awareness and educational purposes only. If you or someone you know is struggling, please contact a mental health professional or suicide prevention hotline.

---

## 🤝 Contributing

Pull requests and suggestions are welcome! For major changes, please open an issue first.

---
## 📬 Contact

Shashank Gurjar
- 🔗 GitHub: [shashigurjar](https://github.com/shashigurjar)

---
## ⭐️ Support

If you found this useful, please consider giving it a ⭐️ on GitHub.
