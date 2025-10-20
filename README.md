# Flask Resume Generator

## Description

This is a web application that allows users to generate a professional-looking resume by filling out a simple web form. The application features a live preview that updates as you type and can export the final resume as a downloadable PDF file. The project is built with a cloud-friendly mindset, using a pure Python stack for the backend to ensure easy deployment on various cloud platforms.

## Features

- **Live Preview**: See your resume update in real-time as you enter your information.
- **Multiple Sections**: Includes standard sections like Work Experience, Education, and Skills.
- **Expanded Sections**: Support for additional sections like Projects, Certifications, Achievements, Languages, and Research & Conferences.
- **Custom Sections**: Ability to add your own uniquely titled sections to the resume.
- **Section Visibility**: Use checkboxes to select which sections you want to include in the final PDF.
- **Dynamic Entries**: Add multiple entries for sections like Work Experience, Education, and Projects.
- **PDF Export**: Download your final resume as a clean, formatted PDF document.

## Technology Stack

- **Backend**: Flask (Python)
- **PDF Generation**: ReportLab (Pure Python)
- **Frontend**: HTML, CSS, Vanilla JavaScript

## Project Structure

```
resume-generator-flask/
├── static/
│   ├── style.css         # Main stylesheet
│   └── script.js         # Frontend interactivity and live preview
├── templates/
│   └── index.html        # Main HTML template for the form and preview
├── app.py                # Main Flask application logic and PDF generation
├── requirements.txt      # Python package dependencies
└── README.md             # This file
```

## Setup and Usage

Follow these steps to run the application locally.

### 1. Create a Virtual Environment

It is recommended to run the application in a virtual environment.

```bash
# Create a virtual environment named 'venv'
python -m venv venv

# Activate the virtual environment
# On Windows:
.\venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

### 2. Install Dependencies

Install all the required Python packages from the `requirements.txt` file.

```bash
pip install -r requirements.txt
```

### 3. Run the Application

Once the dependencies are installed, you can start the Flask development server.

```bash
python app.py
```

The application will be running at `http://127.0.0.1:5000`.
