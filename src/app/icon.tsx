import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000000',
          color: '#ffffff',
          fontSize: 14,
          fontWeight: 900,
          fontFamily: 'system-ui, "Arial Black", sans-serif',
          borderRadius: '50%',
          letterSpacing: '-1px',
        }}
      >
        {'</>'}
      </div>
    ),
    {
      ...size,
    }
  );
}