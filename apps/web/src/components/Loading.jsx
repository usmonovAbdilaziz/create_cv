

function Loading() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 255, 0.2)", // ko‘k rang, 20% opacity
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999, // barcha komponentlar ustida
      }}
    >
      <div
        style={{
          width: "60px",
          height: "60px",
          border: "6px solid #ccc",
          borderTop: "6px solid #0044ff", // kuchliroq ko‘k
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
        `}
      </style>
    </div>
  );
}

export default Loading;
