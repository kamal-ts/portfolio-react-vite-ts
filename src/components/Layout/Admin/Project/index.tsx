import { useEffect, useState } from "react";
import axios from "axios";
import { API_MYPROJECT_ENDPOINTS } from "../../../../util/apiConfig";
import { ProjectType } from "./interface";
import ListProject from "./ListProject";
import CreateProject from "./CreateProject";
import UpdateProject from "./UpdateProject";

const Project = () => {
  const [events, setevents] = useState("list");

  const [project, setProject] = useState<[ProjectType] | undefined>();
  const [error, setError] = useState("");

  const getProject = async () => {
    try {
      const result = await axios.get(API_MYPROJECT_ENDPOINTS);
      setProject(result.data.data);
    } catch (error) {
      setError("error");
    }
  };

  const handleEvents = (e: string) => {
    setevents(e);
  };

  useEffect(() => {
    getProject();
  }, []);
  return (
    <>
      {(events === "list" && (
        <ListProject
          error={error}
          project={project}
          handleEvents={handleEvents}
        />
      )) ||
        (events === "create" && <CreateProject handleEvents={handleEvents}/>) ||
        (events === "update" && <UpdateProject />)}
    </>
  );
};

export default Project;
