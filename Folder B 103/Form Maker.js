document.addEventListener("DOMContentLoaded", () => {
    const draggables = document.querySelectorAll('.draggable');
    const dropZone = document.getElementById('form-builder');
    const generateHtmlBtn = document.getElementById('generate-html');
    const generatedHtmlOutput = document.getElementById('generated-html-output');

    let draggedElement = null;

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', (e) => {
            draggedElement = e.target;
            e.dataTransfer.setData('text/plain', e.target.dataset.type);
            // Erro corrigido: 'draggging' para 'dragging'
            e.target.classList.add('dragging'); 
        });
        draggable.addEventListener('dragend', (e) => {
            // Erro corrigido: 'draggging' para 'dragging'
            e.target.classList.remove('dragging'); 
            draggedElement = null;
        });
    });

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-over');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('drag-over');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
        
        const fieldType = e.dataTransfer.getData('text/plain');
        if (fieldType) {
            const newField = createFormField(fieldType);
            if (newField) {
                dropZone.appendChild(newField);
                newField.querySelector('.remove-field').addEventListener('click', () => {
                    newField.remove();
                });
            }
        }
    });

    function createFormField(type) {
        const fieldWrapper = document.createElement('div');
        fieldWrapper.classList.add('form-field');
        let htmlContent = '';
        let labelText = ''; // Esta variável não estava sendo usada no HTML gerado pelo wrapper. Deixei para referência.

        switch (type) {
            case 'text':
                labelText = 'Text Field';
                htmlContent = `
                    <label>Field Name:</label><input type="text" class="field-label" value="Text Field">
                    <label>Placeholder:</label><input type="text" class="field-placeholder" value="Enter text here">`;
                break;
            case 'email':
                labelText = 'Email Field';
                // Erro corrigido: Fechamento da tag <label>
                htmlContent = `<label>Field Name:</label><input type="text" class="field-label" value="Email Field">
                    <label>Placeholder:</label><input type="email" class="field-placeholder" value="email@example.com">`; 
                break;
            case 'password':
                labelText = 'Password Field';
                htmlContent = `<label>Field Name:</label><input type="text" class="field-label" value="Password Field">
                    <label>Placeholder:</label><input type="password" class="field-placeholder" value="Your password">`;
                break;
            case 'number':
                labelText = 'Number Field';
                htmlContent = `<label>Field Name:</label><input type="text" class="field-label" value="Number Field">
                    <label>Placeholder:</label><input type="number" class="field-placeholder" value="123">`;
                break;
            case 'select':
                labelText = 'Select Field';
                // Erro corrigido: Fechamento da string literal no final (faltava um backtick `)
                htmlContent = `<label>Field Name:</label><input type="text" class="field-label" value="Select Field">
                    <label>Options (comma separated):</label><input type="text" class="field-options" value="Option A, Option B">`; 
                break;
            case 'checkbox':
                labelText = 'Checkbox Field';
                htmlContent = `<label>Field Name:</label><input type="text" class="field-label" value="Checkbox Field">
                    <label>Label:</label><input type="text" class="field-checkbox-label" value="Checkbox">`;
                break;
            case 'radio':
                labelText = 'Radio Button';
                htmlContent = `<label>Field Name:</label><input type="text" class="field-label" value="Radio Button Field">
                    <label>Options (comma separated):</label><input type="text" class="field-options" value="Option A, Option B">`;
                break;
            case 'textarea':
                labelText = 'Textarea Field';
                htmlContent = `<label>Field Name:</label><input type="text" class="field-label" value="Textarea Field">
                    <label>Placeholder:</label><input type="text" class="field-placeholder" value="Enter your message here">`;
                break;
            default:
                return null;
        }

        fieldWrapper.innerHTML = `
            ${htmlContent}<button class="remove-field">Remove Field</button>`; // Erro corrigido: Adicionado aspas para a classe do botão
        fieldWrapper.dataset.type = type;
        return fieldWrapper;
    }

    // Erro corrigido: 'genenerateHtmlBtn' para 'generateHtmlBtn'
    generateHtmlBtn.addEventListener('click', () => { 
        let generatedHtml = '<form>\n'; // Variável renomeada para evitar conflito com a função e melhorar a legibilidade
        const formFields = dropZone.querySelectorAll('.form-field');

        formFields.forEach(field => {
            const type = field.dataset.type;
            const labelInput = field.querySelector('.field-label');
            const placeholderInput = field.querySelector('.field-placeholder');
            const optionsInput = field.querySelector('.field-options');

            const labelValue = labelInput ? labelInput.value : '';
            // Erro corrigido: 'placeholdeValue' para 'placeholderValue'
            const placeholderValue = placeholderInput ? `placeholder="${placeholderInput.value}"` : ''; 
            const nameAttr = labelValue.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

            switch(type) {
                case 'text':
                case 'email':
                case 'password':
                case 'number':
                    // Erro corrigido: '{labelValue}' para '${labelValue}' (template literal)
                    generatedHtml += `    <div>\n
                        <label for="${nameAttr}">${labelValue}:</label>\n    <input type="${type}"
                        id="${nameAttr}" name="${nameAttr}" ${placeholderValue}>\n</div>\n`;
                    break;
                case 'textarea':
                    generatedHtml += `<div>\n
                        <label for="${nameAttr}">${labelValue}:</label>\n
                        <textarea id="${nameAttr}" name="${nameAttr}" ${placeholderValue}></textarea>\n</div>\n`;
                    break;
                case 'select':
                    const options = optionsInput ?
                    optionsInput.value.split(',').map(opt => 
                        opt.trim()) : [];
                    let optionsHtml = '';
                    options.forEach(option => {
                        optionsHtml += `      <option value="${option.toLowerCase().replace(/\s+/g, '-')}">${option}</option>\n`;
                    });
                    generatedHtml += `    <div>\n <label for="${nameAttr}">${labelValue}:</label>\n
                        <select id="${nameAttr}" name="${nameAttr}">\n${optionsHtml}</select>\n</div>\n`;
                    // Erro corrigido: Parêntese extra fechando o switch case
                    break; 
                case 'checkbox':
                    // Erro corrigido: O labelValue aqui deveria ser o valor do .field-checkbox-label se existir. Ajustei para usar o labelInput ou o valor de .field-checkbox-label
                    const checkboxLabel = field.querySelector('.field-checkbox-label');
                    const finalCheckboxLabel = checkboxLabel ? checkboxLabel.value : labelValue;

                    generatedHtml += `<div>\n
                        <input type="checkbox" id="${nameAttr}" name="${nameAttr}">\n <label for="${nameAttr}">${finalCheckboxLabel}</label>\n</div>\n`;
                    break;
                case 'radio':
                    const radioOptions = optionsInput ?
                    optionsInput.value.split(',').map(opt => opt.trim()) : [];
                    let radioHtml = `<div>\n    <p>${labelValue}:</p>\n`;
                    // Erro corrigido: Parâmetro 'index' em forEach estava sem chaves e vírgula
                    radioOptions.forEach((option, index) => { 
                        const radioId = `${nameAttr}-${index}`;
                        // Erro corrigido: Vírgula extra, ponto e vírgula, e concatenação correta de string
                        radioHtml += `<div>\n
                            <input type="radio" id="${radioId}" name="${nameAttr}" value="${option.toLowerCase().replace(/\s+/g, '-')}"`; 
                        if (index === 0) radioHtml += ` checked`;
                        radioHtml += `>\n <label for="${radioId}">${option}</label>\n</div>\n`;
                    });
                    radioHtml += `</div>\n`;
                    generatedHtml += radioHtml;
                    break;
            }
        });

        generatedHtml += '<button type="submit">Submit</button>\n'; // Removida a tag </form> duplicada
        generatedHtml += '</form>'; // A tag </form> foi movida para o final para fechar corretamente

        generatedHtmlOutput.textContent = generatedHtml;
    });
});
/* Código corrigido pela IA Gemini, devido à autocorreção do Copilot causando erros de digitação, sintaxe incorreta e não fechamento de tags. */
