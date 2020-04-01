export class Editor {
    // 全局Editor
    public config = {
        alignment: {
            options: ['left', 'center', 'right']
        },
        toolbar: ['heading', '|', 'bold', 'italic', 'link', 'alignment',
            'bulletedList', 'numberedList', 'blockQuote', 'undo', 'redo', 'insertTable',
            'ckfinder', 'imageTextAlternative', 'imageUpload', 'imageStyle:full', 'imageStyle:side'
        ],
        language: 'zh-cn',
        fontSize: {
            options: [12, 'default', 14, 16, 18, 20, 22, 24, 26, 28, 36, 44, 48, 72],
        },
        fontFamily: {
            options: [
                'default',
                'Arial, Helvetica, sans-serif',
                'Courier New, Courier, monospace',
                'Georgia, serif',
                'Lucida Sans Unicode, Lucida Grande, sans-serif',
                'Tahoma, Geneva, sans-serif',
                'Times New Roman, Times, serif',
                'Trebuchet MS, Helvetica, sans-serif',
                'Verdana, Geneva, sans-serif',
            ]
        },
        heading: {
            options: [
                { model: 'paragraph', title: '正文', class: 'ck-heading_paragraph' },
                { model: 'heading1', view: 'h1', title: '标题1', class: 'ck-heading_heading1' },
                { model: 'heading2', view: 'h2', title: '标题2', class: 'ck-heading_heading2' },
                { model: 'heading3', view: 'h3', title: '标题3', class: 'ck-heading_heading3' },
                { model: 'heading4', view: 'h4', title: '标题4', class: 'ck-heading_heading4' },
                { model: 'heading5', view: 'h5', title: '标题5', class: 'ck-heading_heading5' },
            ]
        },
        ckfinder: {
            uploadUrl: '/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json',
        }
    };
}
