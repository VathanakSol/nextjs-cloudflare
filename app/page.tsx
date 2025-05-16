import Image from 'next/image';

export default function Home() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(45deg, #00C6FF, #0070f3)', 
      fontFamily: 'Arial, sans-serif',
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        padding: '50px',
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
        textAlign: 'center',
        maxWidth: '700px',
        width: '100%',
      }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          marginBottom: '20px', 
          fontWeight: 'bold', 
          color: '#333', 
        }}>
          <span style={{ color: '#f38020' }}>Cloudflare</span> <span style={{ color: '#0070f3' }}>Meets</span> <span style={{ color: '#333' }}>Next.js</span>
        </h1>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', alignItems: 'center', marginBottom: '30px' }}>
          <Image
            src="/cloudflare.svg"
            alt="Cloudflare Logo"
            width={150}
            height={75}
          />
          <Image
            src="/nextjs.svg"
            alt="Next.js Logo"
            width={150}
            height={75}
          />
        </div>
        <p style={{ marginTop: '20px', fontSize: '18px', color: '#555' }}>
          A blazing fast, serverless web experience with <strong>OpenNext</strong>
        </p>
      </div>
    </div>
  );
}