import './HeroBlobs.css';

interface HeroBlobsProps {
  style1?: React.CSSProperties;
  style2?: React.CSSProperties;
  style3?: React.CSSProperties;
}

export default function HeroBlobs({ style1, style2, style3 }: HeroBlobsProps) {
  return (
    <div className="hero-blobs">
      {style1 && <div className="blob blob-1" style={style1}></div>}
      {style2 && <div className="blob blob-2" style={style2}></div>}
      {style3 && <div className="blob blob-3" style={style3}></div>}
      
      {!style1 && !style2 && !style3 && (
        <>
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
          <div className="blob blob-3"></div>
        </>
      )}
    </div>
  );
}
