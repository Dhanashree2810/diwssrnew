
interface ImgViewerProps {
  key: string | number;
  imageFileName: string;
}

export default function ImgViewer({ imageFileName }: ImgViewerProps) {
  return (
    <>
      <div
        className="flex flex-col"
      >
        <span className="text-black block text-sm">{imageFileName}</span>
      </div>
    </>
  );
}
