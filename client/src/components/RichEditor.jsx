import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function RichEditor({ description, setDescription }) {
  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['blockquote'],
    ['link', 'image', 'video'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ align: [] }],

    ['clean'], // remove formatting button
  ];

  return (
    <>
      <ReactQuill
        modules={{ toolbar: toolbarOptions }}
        theme="snow"
        value={description}
        onChange={setDescription}
      />
    </>
  );
}
