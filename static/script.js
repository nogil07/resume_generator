document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('resume-form');

    // --- COUNTERS --- 
    const entryCounters = { experience: 1, education: 1, project: 1, certification: 1, achievement: 1, language: 1, research: 1 };
    let customSectionCount = 0;

    // --- EVENT LISTENERS ---
    form.addEventListener('input', updatePreview);
    document.getElementById('add-experience').addEventListener('click', () => addEntry('experience'));
    document.getElementById('add-education').addEventListener('click', () => addEntry('education'));
    document.getElementById('add-project').addEventListener('click', () => addEntry('project'));
    document.getElementById('add-certification').addEventListener('click', () => addEntry('certification'));
    document.getElementById('add-achievement').addEventListener('click', () => addEntry('achievement'));
    document.getElementById('add-language').addEventListener('click', () => addEntry('language'));
    document.getElementById('add-research').addEventListener('click', () => addEntry('research'));
    document.getElementById('add-custom-section').addEventListener('click', addCustomSection);

    // Event delegation for adding entries to custom sections
    form.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('add-custom-entry-button')) {
            const sectionIndex = e.target.dataset.sectionIndex;
            addCustomEntry(sectionIndex);
        }
    });

    // --- TEMPLATES for dynamic entries ---
    const entryTemplates = {
        experience: (i) => `<hr><input type="text" name="experience-title-${i}" placeholder="Job Title" class="form-input"><input type="text" name="experience-company-${i}" placeholder="Company" class="form-input"><input type="text" name="experience-dates-${i}" placeholder="Dates" class="form-input"><textarea name="experience-desc-${i}" placeholder="Description..." class="form-input"></textarea>`, 
        education: (i) => `<hr><input type="text" name="education-degree-${i}" placeholder="Degree" class="form-input"><input type="text" name="education-school-${i}" placeholder="School" class="form-input"><input type="text" name="education-dates-${i}" placeholder="Dates" class="form-input">`, 
        project: (i) => `<hr><input type="text" name="project-title-${i}" placeholder="Project Title" class="form-input"><textarea name="project-desc-${i}" placeholder="Description..." class="form-input"></textarea>`, 
        certification: (i) => `<hr><input type="text" name="cert-name-${i}" placeholder="Certification Name" class="form-input">`, 
        achievement: (i) => `<hr><input type="text" name="achievement-name-${i}" placeholder="Achievement" class="form-input">`, 
        language: (i) => `<hr><input type="text" name="language-name-${i}" placeholder="Language" class="form-input">`, 
        research: (i) => `<hr><input type="text" name="research-title-${i}" placeholder="Title" class="form-input"><textarea name="research-desc-${i}" placeholder="Description..." class="form-input"></textarea>`, 
        custom: (sectionIndex, entryIndex) => `<hr><input type="text" name="custom-${sectionIndex}-title-${entryIndex}" placeholder="Entry Title" class="form-input"><textarea name="custom-${sectionIndex}-desc-${entryIndex}" placeholder="Description..." class="form-input"></textarea>`
    };

    // --- FUNCTIONS for adding new form elements ---
    function addEntry(type) {
        entryCounters[type]++;
        const i = entryCounters[type];
        const newEntry = document.createElement('div');
        newEntry.className = `${type}-entry`;
        newEntry.innerHTML = entryTemplates[type](i);
        document.getElementById(`${type}-section`).appendChild(newEntry);
    }

    function addCustomSection() {
        customSectionCount++;
        const i = customSectionCount;
        const newSection = document.createElement('div');
        newSection.className = 'custom-section-block';
        newSection.innerHTML = `
            <hr style="border-top: 2px solid var(--accent);">
            <h3>Custom Section</h3>
            <input type="text" name="custom-title-${i}" placeholder="Custom Section Title (e.g., Volunteering)" class="form-input">
            <div id="custom-section-${i}-entries"></div>
            <button type="button" class="secondary-button add-custom-entry-button" data-section-index="${i}">+ Add Entry to this Section</button>
        `;
        document.getElementById('custom-sections-container').appendChild(newSection);
        // Add the first entry for the new custom section
        addCustomEntry(i);
    }

    function addCustomEntry(sectionIndex) {
        const container = document.getElementById(`custom-section-${sectionIndex}-entries`);
        const entryIndex = container.children.length + 1;
        const newEntry = document.createElement('div');
        newEntry.className = 'custom-entry';
        newEntry.innerHTML = entryTemplates.custom(sectionIndex, entryIndex);
        container.appendChild(newEntry);
    }

    // --- MAIN PREVIEW FUNCTION ---
    function updatePreview() {
        const data = new FormData(form);
        const sections = Object.fromEntries(data.entries());

        // Update standard sections (code from previous steps, abridged for clarity)
        // ... (personal info, experience, education, etc. rendering logic) ...
        
        // --- Clear and Render Custom Sections ---
        const customContainer = document.getElementById('preview-custom-sections');
        customContainer.innerHTML = '';
        for (let i = 1; i <= customSectionCount; i++) {
            const customTitle = sections[`custom-title-${i}`];
            if (customTitle) {
                let sectionHTML = `<section class="resume-section"><h2>${customTitle}</h2>`;
                let entryIndex = 1;
                while (sections[`custom-${i}-title-${entryIndex}`]) {
                    const title = sections[`custom-${i}-title-${entryIndex}`];
                    const desc = sections[`custom-${i}-desc-${entryIndex}`];
                    sectionHTML += `
                        <div class="job"> 
                            <div><strong>${title}</strong></div>
                            <div class="job-description">${(desc || '').replace(/\n/g, '<br>')}</div>
                        </div>`;
                    entryIndex++;
                }
                sectionHTML += '</section>';
                customContainer.innerHTML += sectionHTML;
            }
        }
        // NOTE: This is a simplified version. A full implementation would require re-inserting the full preview logic here.
    }
    // A full, correct implementation requires integrating the previous logic with the new custom section logic.
    // The below is a corrected, full updatePreview function.
    function fullUpdatePreview() {
        const data = new FormData(form);
        const sections = Object.fromEntries(data.entries());

        // Update personal info
        document.getElementById('preview-name').innerText = sections.name || 'Your Name';
        document.getElementById('preview-email').innerHTML = `<i class="fas fa-envelope"></i> ${sections.email || 'your.email@example.com'}`;
        document.getElementById('preview-phone').innerHTML = `<i class="fas fa-phone"></i> ${sections.phone || '(123) 456-7890'}`;
        document.getElementById('preview-linkedin').innerHTML = `<i class="fab fa-linkedin"></i> ${sections.linkedin || 'linkedin.com/in/yourprofile'}`;

        const sectionRenderers = {
            experience: (data) => {
                let html = '';
                for (let i = 1; i <= entryCounters.experience; i++) {
                    const title = data[`experience-title-${i}`];
                    if (!title) continue;
                    html += `<div class="job"><div class="job-title"><span class="job-company">${data[`experience-company-${i}`] || ''}</span><span class="meta-text">${data[`experience-dates-${i}`] || ''}</span></div><div><strong>${title}</strong></div><div class="job-description">${(data[`experience-desc-${i}`] || '').replace(/\n/g, '<br>')}</div></div>`;
                }
                return `<section class="resume-section"><h2>Work Experience</h2><hr class="section-divider">${html}</section>`;
            },
            education: (data) => {
                let html = '';
                for (let i = 1; i <= entryCounters.education; i++) {
                    const degree = data[`education-degree-${i}`];
                    if (!degree) continue;
                    html += `<div class="school"><div class="degree-title"><span class="school-name">${data[`education-school-${i}`] || ''}</span><span>${data[`education-dates-${i}`] || ''}</span></div><div><strong>${degree}</strong></div></div>`;
                }
                return `<section class="resume-section"><h2>Education</h2><hr class="section-divider">${html}</section>`;
            },
            projects: (data) => {
                let html = '';
                for (let i = 1; i <= entryCounters.project; i++) {
                    const title = data[`project-title-${i}`];
                    if (!title) continue;
                    const desc = (data[`project-desc-${i}`] || '').split('\n').map(line => `<li>${line}</li>`).join('');
                    html += `<div class="job"><div><strong>${title}</strong></div><ul class="job-description bulleted-list">${desc}</ul></div>`;
                }
                return `<section class="resume-section"><h2>Projects</h2><hr class="section-divider">${html}</section>`;
            },
            skills: (data) => {
                const skills = (data.skills || '').split(',').map(s => s.trim()).filter(s => s);
                return `<section class="resume-section"><h2>Skills</h2><hr class="section-divider"><ul class="skills-list">${skills.map(s => `<li class="skill-item">${s}</li>`).join('')}</ul></section>`;
            },
            certifications: (data) => {
                let html = '<ul class="skills-list">';
                for (let i = 1; i <= entryCounters.certification; i++) {
                    const name = data[`cert-name-${i}`];
                    if (name) html += `<li class="skill-item">${name}</li>`;
                }
                return `<section class="resume-section"><h2>Certifications</h2><hr class="section-divider">${html}</ul></section>`;
            },
            achievements: (data) => {
                let html = '<ul class="skills-list">';
                for (let i = 1; i <= entryCounters.achievement; i++) {
                    const name = data[`achievement-name-${i}`];
                    if (name) html += `<li class="skill-item">${name}</li>`;
                }
                return `<section class="resume-section"><h2>Achievements</h2><hr class="section-divider">${html}</ul></section>`;
            },
            languages: (data) => {
                let html = '<ul class="skills-list">';
                for (let i = 1; i <= entryCounters.language; i++) {
                    const name = data[`language-name-${i}`];
                    if (name) html += `<li class="skill-item">${name}</li>`;
                }
                return `<section class="resume-section"><h2>Languages</h2><hr class="section-divider">${html}</ul></section>`;
            },
            research: (data) => {
                let html = '';
                for (let i = 1; i <= entryCounters.research; i++) {
                    const title = data[`research-title-${i}`];
                    if (!title) continue;
                    html += `<div class="job"><div><strong>${title}</strong></div><div class="job-description">${(data[`research-desc-${i}`] || '').replace(/\n/g, '<br>')}</div></div>`;
                }
                return `<section class="resume-section"><h2>Research & Conferences</h2><hr class="section-divider">${html}</section>`;
            }
        };

        const previewContainer = document.querySelector('.resume-preview-document');
        const header = previewContainer.querySelector('.resume-header');
        
        // Clear everything except the header
        previewContainer.innerHTML = '';
        previewContainer.appendChild(header);

        const sectionOrder = (sections.section_order || '').split(',');

        for (const sectionName of sectionOrder) {
            if (sections[`include_${sectionName}`] && sectionRenderers[sectionName]) {
                const sectionHtml = sectionRenderers[sectionName](sections);
                previewContainer.innerHTML += sectionHtml;
            }
        }

        // Re-add the custom sections container at the end
        const customContainer = document.createElement('div');
        customContainer.id = 'preview-custom-sections';
        previewContainer.appendChild(customContainer);

        // Render custom sections
        for (let i = 1; i <= customSectionCount; i++) {
            const customTitle = sections[`custom-title-${i}`];
            if (customTitle) {
                let sectionHTML = `<section class="resume-section"><h2>${customTitle}</h2>`;
                let entryIndex = 1;
                while (sections[`custom-${i}-title-${entryIndex}`]) {
                    const title = sections[`custom-${i}-title-${entryIndex}`];
                    const desc = sections[`custom-${i}-desc-${entryIndex}`];
                    sectionHTML += `<div class="job"><div><strong>${title}</strong></div><div class="job-description">${(desc || '').replace(/\n/g, '<br>')}</div></div>`;
                    entryIndex++;
                }
                sectionHTML += '</section>';
                customContainer.innerHTML += sectionHTML;
            }
        }
    }

    // Replace the simple updatePreview with the full one
    form.removeEventListener('input', updatePreview);
    form.addEventListener('input', fullUpdatePreview);
    fullUpdatePreview(); // Initial call

    // --- DRAG AND DROP FOR SECTION REORDERING ---
    const sectionList = document.getElementById('section-list');
    const sectionOrderInput = document.getElementById('section-order');

    function updateSectionOrder() {
        const order = [...sectionList.children].map(item => item.dataset.section);
        sectionOrderInput.value = order.join(',');
        // Also trigger preview update to reflect the new order
        fullUpdatePreview();
    }

    sectionList.addEventListener('dragstart', e => {
        e.target.classList.add('dragging');
    });

    sectionList.addEventListener('dragend', e => {
        e.target.classList.remove('dragging');
        updateSectionOrder();
    });

    sectionList.addEventListener('dragover', e => {
        e.preventDefault(); // Necessary to allow dropping
        const draggingItem = document.querySelector('.dragging');
        const afterElement = getDragAfterElement(sectionList, e.clientY);
        if (afterElement == null) {
            sectionList.appendChild(draggingItem);
        } else {
            sectionList.insertBefore(draggingItem, afterElement);
        }
    });

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.section-list-item:not(.dragging)')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    // Initial call to set the default order
    updateSectionOrder();
});
