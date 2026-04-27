import './SnapPreview.css';
import useWindowStore from '../../store/windowStore';

const SnapPreview = () => {
  const snapPreview = useWindowStore((s) => s.snapPreview);
  if (!snapPreview) return null;

  const { rect } = snapPreview;

  return (
    <div
      className="snap-preview"
      style={{
        left: rect.x,
        top: rect.y,
        width: rect.width,
        height: rect.height,
      }}
    />
  );
};

export default SnapPreview;
