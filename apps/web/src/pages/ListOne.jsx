import { useEffect, useRef, useState } from "react";
import useUserStore from "../zustand-kesh/ZustandKesh";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Loading from "../components/Loading";

function ListOne() {
  const user = useUserStore((state) => state.user);
  const divRef = useRef(null);
  const [response, setData] = useState(null);
  const [louder, setLouder] = useState(false);
  // useEffect(() => {
  //   if(!data)return;

  //   // window.Telegram.WebApp.sendData(JSON.stringify(data))

  // },[data]);
  const sendPdfToBot = async () => {
    setLouder(true);
    const element = divRef.current;
    if (!element) {
      console.error("pdfRef is undefined!");
      return;
    }

    // 1️⃣ Elementni canvasga aylantirish
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    // 2️⃣ PDF yaratish
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

    // 3️⃣ PDFni ArrayBuffer (buffer) shaklida olish
    const pdfArrayBuffer = pdf.output("arraybuffer");
    const pdfBlob = new Blob([pdfArrayBuffer], { type: "application/pdf" });

    // 4️⃣ FormData yaratish
    const formData = new FormData();
    formData.append("file", pdfBlob, "cv.pdf"); // fayl nomi
    const userId = localStorage.getItem("id"); // userId localstoragedan
    formData.append("userId", userId || "");

    // 5️⃣ Fetch bilan yuborish
    try {
      const res = await fetch("/api/upload-cv", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setData(data.data);
      await window.Telegram.WebApp.sendData(JSON.stringify(data.data));
      console.log("Server javobi:", data.data);
    } catch (error) {
      console.error("Upload error:", error);
    }
    setLouder(false);
  };

  return (
    <>
      <div ref={divRef}>
        <hr
          style={{
            backgroundColor: "blue",
            padding: "10px",
            border: "none",
            margin: "0",
          }}
        />
        <div style={{ padding: "0px 20px" }}>
          <h3 style={{ fontSize: "16px", paddingTop: "5PX", margin: "0" }}>
            {user.user.name}
          </h3>
          <small style={{ fontSize: "12px", padding: "0", margin: "0" }}>
            {" "}
            <strong>Telefon raqami: </strong>
            {user.user.phone}
            <span>
              <br /> <strong>Telegra Link:</strong> https://t.me/
              {user.user.username}
            </span>
          </small>
        </div>
        <div style={{ padding: "0 5px" }}>
          <h3
            style={{
              fontSize: "16px",
              marginTop: "10px",
              marginBottom: "0",
              color: "#01248ee9",
            }}
          >
            ABOUT ME
          </h3>
          <hr style={{ margin: "0 0 10px 0 " }} />
          <small style={{ width: "90%", fontSize: "12px" }}>
            {user.user.description
              ? user.user.description
              : "Uzingiz xaqingizda qisqacha batafsil yozing..."}
          </small>
          <h3
            style={{
              fontSize: "16px",
              marginTop: "10px",
              marginBottom: "0",
              color: "#01248ee9",
            }}
          >
            EDUCATION AND TRAINING
          </h3>
          <hr style={{ margin: "0 0 10px 0 " }} />
          <small>
            {user.user.educations === 0
              ? "Uqigan joylaringiz..."
              : user.user.educations.map((edu, index) => {
                  return (
                    <span key={index}>
                      <strong style={{ color: "#01248ee9" }}>
                        {" "}
                        {edu.level} degree
                        <br />
                      </strong>
                      <strong>
                        <i>
                          {edu.title} {edu.school}
                        </i>
                      </strong>{" "}
                      [{edu.year}],<strong>Yunalish:</strong> {edu.position}
                    </span>
                  );
                })}
          </small>
          <h3
            style={{
              fontSize: "16px",
              marginTop: "10px",
              marginBottom: "0",
              color: "#01248ee9",
            }}
          >
            SKILLS{" "}
          </h3>
          <hr style={{ margin: "0 0 10px 0 " }} />
          <small style={{ fontSize: "12px" }}>
            {user.user.skills === 0
              ? "Sohadagi maxoratlaringiz...."
              : user.user.skills.map((skill, index) => {
                  return (
                    <span key={index}>
                      {index + 1}.{skill.name}, <strong> Darajasi:</strong>{" "}
                      {skill.level}
                      <br />{" "}
                    </span>
                  );
                })}
          </small>
          <h3
            style={{
              fontSize: "16px",
              marginTop: "10px",
              marginBottom: "0",
              color: "#01248ee9",
            }}
          >
            PROJECS{" "}
          </h3>
          <hr style={{ margin: "0 0 10px 0 " }} />
          <small>
            {user.user.projects === 0
              ? "Sohadagi maxoratlaringiz...."
              : user.user.projects.map((project, index) => {
                  return (
                    <span key={index}>
                      {index + 1}.{project.name}, <strong> Link:</strong>{" "}
                      {project.link}
                      <br /> <strong>Project buyicha qisqa: </strong>
                      {project.description}
                    </span>
                  );
                })}
          </small>
          <h3
            style={{
              fontSize: "16px",
              marginTop: "10px",
              marginBottom: "0",
              color: "#01248ee9",
            }}
          >
            EXPERIENCE{" "}
          </h3>
          <hr style={{ margin: "0 0 10px 0 " }} />
          <small>
            {user.user.experiences === 0
              ? "Ishlagan joylaringiz...."
              : user.user.experiences.map((experien, index) => {
                  return (
                    <span key={index}>
                      <span>Kompanyalar...</span>
                      <br />
                      {index + 1}.{experien.company},{" "}
                      <strong> Ishlagan:</strong> {experien.duration}
                      <br /> <strong>Qilgan ishlar buyicha qisqa: </strong>
                      {experien.description}
                    </span>
                  );
                })}
          </small>
        </div>
        <hr
          style={{
            backgroundColor: "blue",
            padding: "10px",
            border: "none",
            marginTop: "20px",
          }}
        />
      </div>
      {louder && <Loading />}
      <button onClick={sendPdfToBot} className="download-btn">
        Download PDF
      </button>
    </>
  );
}

export default ListOne;
