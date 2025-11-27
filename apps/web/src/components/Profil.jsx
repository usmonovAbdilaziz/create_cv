import { useEffect, useState } from "react";
import useUserStore from "../zustand-kesh/ZustandKesh";

function Profil() {
  const [openStates, setOpenStates] = useState({
    education: false,
    experiences: false,
    projects: false,
    skills: false,
  });

  // Generic toggle function → Barcha dropdownlarga ishlaydi
  const toggle = (key) => {
    setOpenStates((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

 
  const user = useUserStore((state) => state.user);


  

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>Name: {user.user.name}</h1>
      <p>Phone: {user.user.phone}</p>

      {/* EDUCATION */}
      <p>
        Education{" "}
        <button
          onClick={() => toggle("education")}
          style={{ background: "white", border: "none" }}
        >
          {openStates.education ? "▲" : "▼"}
        </button>
      </p>

      {openStates.education && (
        <div>
          {user.user.educations.map((edu, index) => (
            <p key={index}>
              {index + 1}. {edu.school} - {edu.title}, {edu.position},{" "}
              {edu.level} ({edu.year})
            </p>
          ))}
        </div>
      )}

      {/* EXPERIENCES */}
      <p>
        Experiences{" "}
        <button
          onClick={() => toggle("experiences")}
          style={{ background: "white", border: "none" }}
        >
          {openStates.experiences ? "▲" : "▼"}
        </button>
      </p>
      {openStates.experiences && (
        <div>
          {user.user.experiences.length === 0
            ? "Tajriba maʼlumotlari..."
            : user.user.experiences.map((exper, index) => {
                return (
                  <p key={index}>
                    <span>
                      {index + 1}.{exper.company},Ishlagan yil: {exper.duration}{" "}
                      <br /> Qilgan ishlari: {exper.description}
                    </span>
                  </p>
                );
              })}
        </div>
      )}

      {/* PROJECTS */}
      <p>
        Projects{" "}
        <button
          onClick={() => toggle("projects")}
          style={{ background: "white", border: "none" }}
        >
          {openStates.projects ? "▲" : "▼"}
        </button>
      </p>
      {openStates.projects && (
        <div>
          {user.user.projects.length === 0
            ? "Loyihalar ro‘yxati..."
            : user.user.projects.map((project, index) => {
                return (
                  <p key={index}>
                    <span>
                      {index + 1}.{project.name},Link: {project.link},<br />{" "}
                      Loyihaga tavsif: {project.description}{" "}
                    </span>
                  </p>
                );
              })}
        </div>
      )}

      {/* SKILLS */}
      <p>
        Skills{" "}
        <button
          onClick={() => toggle("skills")}
          style={{ background: "white", border: "none" }}
        >
          {openStates.skills ? "▲" : "▼"}
        </button>
      </p>
      {openStates.skills && (
        <div>
          {" "}
          {user.user.skills.length === 0
            ? "Maxoratlar ro‘yxati..."
            : user.user.skills.map((skill, index) => {
                return (
                  <p key={index}>
                    <span>
                      {index + 1}."{skill.name}";  {" "} Darajasi: {skill.level}
                    </span>
                  </p>
                );
              })}
        </div>
      )}
    </div>
  );
}

export default Profil;
