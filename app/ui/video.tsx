export default function Video(props: any) {
  if (props.embedId) {
    return (
      <iframe
        width="500"
        height="400"
        src={`https://www.youtube.com/embed/${props.embedId}`}
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    );
  } else {
    return;
  }
}
