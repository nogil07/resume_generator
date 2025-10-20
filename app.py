from flask import Flask, render_template, request, make_response
from weasyprint import HTML

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/generate-pdf', methods=['POST'])
def generate_pdf():
    form_data = request.form
    resume_data = {
        'personal': {k: form_data.get(k) for k in ['name', 'email', 'phone', 'linkedin']},
        'visibility': {k: True for k in form_data if k.startswith('include_')},
        'skills': [s.strip() for s in form_data.get('skills', '').split(',') if s.strip()],
        'custom_sections': [],
        'section_order': [s.strip() for s in form_data.get('section_order', '').split(',') if s.strip()]
    }

    def parse_section(prefix, fields):
        items = []
        count = len({k.split('-')[-1] for k in form_data if k.startswith(f'{prefix}-{fields[0]}-')})
        for i in range(1, count + 1):
            item = {field: form_data.get(f'{prefix}-{field}-{i}') for field in fields}
            if any(item.values()):
                items.append(item)
        return items

    resume_data['experiences'] = parse_section('experience', ['title', 'company', 'dates', 'desc'])
    resume_data['education'] = parse_section('education', ['degree', 'school', 'dates'])
    resume_data['projects'] = parse_section('project', ['title', 'desc'])
    resume_data['research'] = parse_section('research', ['title', 'desc'])
    resume_data['certifications'] = parse_section('cert', ['name'])
    resume_data['achievements'] = parse_section('achievement', ['name'])
    resume_data['languages'] = parse_section('language', ['name'])

    # Parse custom sections
    custom_section_count = len([k for k in form_data if k.startswith('custom-title-')])
    for i in range(1, custom_section_count + 1):
        title = form_data.get(f'custom-title-{i}')
        if title:
            custom_section = {
                'title': title,
                'entries': parse_section(f'custom-{i}', ['title', 'desc'])
            }
            resume_data['custom_sections'].append(custom_section)

    # Read CSS content to embed in the template
    with open('static/style.css', 'r') as f:
        css_string = f.read()

    # Render the HTML template with the resume data and CSS
    rendered_html = render_template('resume_pdf.html', css=css_string, **resume_data)

    # Generate PDF from the rendered HTML
    pdf = HTML(string=rendered_html, base_url=request.base_url).write_pdf()

    response = make_response(pdf)
    response.headers['Content-Type'] = 'application/pdf'
    response.headers['Content-Disposition'] = 'attachment; filename=resume.pdf'
    return response

if __name__ == '__main__':
    app.run(debug=True)