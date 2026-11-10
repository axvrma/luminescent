import { ImageResponse } from 'next/og';
export const alt = 'Luminescent — A little light. A lot of possibility.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        padding: '70px 85px',
        background: '#0c0d10',
        color: '#ecebf0',
        borderTop: '2px solid #efbb96',
      }}
    >
      <div style={{ display: 'flex', fontSize: 32, letterSpacing: -1 }}>
        ✳ luminescent<span style={{ color: '#efbb96' }}>.</span>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          fontSize: 77,
          lineHeight: 1.1,
          letterSpacing: -4,
        }}
      >
        <span>A little light.</span>
        <span style={{ color: '#efbb96' }}>A lot of possibility.</span>
      </div>
      <div style={{ display: 'flex', fontSize: 21, color: '#a39aaa' }}>
        Thoughtfully crafted React components. Yours in every detail.
      </div>
    </div>,
    size,
  );
}
