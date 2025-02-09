import { useEffect, useState } from "react";
import axios from "axios";
import { API_MYPROJECT_ENDPOINTS } from "../../../../util/apiConfig";
import { PagingPage, ProjectType, QueryParams } from "./interface";
import ListProject from "./ListProject";
import CreateProject from "./CreateProject";
import UpdateProject from "./UpdateProject";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../Auth/AuthContext";
import DetileProject from "./DetileProject";
import EditProject from "./EditProject";

const Project = () => {
  // to conttrol project page
  const [events, setevents] = useState<string>("list");
  const { token } = useAuth();
  const [project, setProject] = useState<[ProjectType] | undefined>();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [paging, setPaging] = useState<PagingPage>({
    current_page: 1,
    total_item: 10,
    total_page: 0,
  });
  // const [page, setPage] = useState<number>(1)
  const [queryParams, setQueryParams] = useState<QueryParams | null>(null);

  const getProject = async () => {
    setIsLoading(true);
    try {
      const result = await axios.get(API_MYPROJECT_ENDPOINTS, {
        params: queryParams,
      });
      console.log("queryParams", queryParams);
      setProject(result.data.data);
      setPaging(result.data.paging);
      console.log("project", result);
    } catch (error) {
      setError("error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProject = async (idProject: string | null) => {
    setIsLoading(true);
    try {
      await axios.delete(API_MYPROJECT_ENDPOINTS + "/" + idProject, {
        headers: { Authorization: token },
      });
      await getProject();
      toast.success("Deleting Project was Successfull");
    } catch (error) {
      setError("Deleting Failed!!!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEvents = (e: string) => {
    setevents(e);
  };

  const splitEvents = (e: string) => {
    const result = e.split('/');
    return result
  }

  const location = useLocation();
  useEffect(() => {
    getProject();
    if (location.state && location.state.notifFromLogin) {
      toast.success("Your Project Was Created!");
    }
  }, [location, queryParams]);

  return (
    <>
      {(events === "list" && (
        <ListProject
          error={error}
          project={project}
          handleEvents={handleEvents}
          handleDeleteProject={handleDeleteProject}
          isLoading={isLoading}
          paging={paging}
          setQueryParams={setQueryParams}
          queryParams={queryParams}
        />
      )) ||
        (events === "create" && (
          <CreateProject handleEvents={handleEvents} getProject={getProject} />
        )) ||
        (events === "update" && <UpdateProject />) ||
        (splitEvents(events)[0] === "edit" && (
          <EditProject handleEvents={handleEvents} idProject={events.split("/")[1]} getProject={getProject} />
        )) ||
        (events && (
          <DetileProject
            idProject={events}
            token={token}
            handleEvents={handleEvents}
          />
        ))}
    </>
  );
};

export default Project;
