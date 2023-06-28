import jobs from "../data/data";
import { Link } from "react-router-dom";
import { useState } from "react";

export function JobList() {
  const [jobData, setJobData] = useState(jobs);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchByLocation, setSearchByLocation] = useState("");
  const searchTermValue = searchTerm.toLowerCase();

  const locationSearchHandler = () => {
    const filteredData = jobs.filter((job) =>
      job.location.toLowerCase().includes(searchByLocation.toLowerCase())
    );
    setJobData(filteredData);
  };

  const filterJobData = (e) => {
    const filterValue = e.target.value;
    if (filterValue === "todos") {
      const filterdData = jobs.filter((job) => job === job);
      setJobData(filterdData);
    } else if (filterValue === "full-time") {
      const filterdData = jobs.filter((job) => job.contract === "Full Time");
      setJobData(filterdData);
    } else if (filterValue === "part-time") {
      const filterdData = jobs.filter((job) => job.contract === "Part Time");
      setJobData(filterdData);
    } else if (filterValue === "freelance") {
      const filterdData = jobs.filter((job) => job.contract === "Freelance");
      setJobData(filterdData);
    }
  };

  return (
    <section className="job__list">
      <div className="container">
        <div className="job__list__wrapper">
          <div className="search__panel">
            <div className="search__panel-01">
              <input
                type="text"
                placeholder="Busqueda por titulo, empresas"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="search__panel-02">
              <input
                type="text"
                placeholder="Busqueda por ubicacion"
                value={searchByLocation}
                onChange={(e) => setSearchByLocation(e.target.value)}
              />
              <button onClick={locationSearchHandler}>Buscar</button>
            </div>
            <div className="search__panel-02">
              <select onChange={filterJobData}>
                <option value="todos">todos</option>
                <option value="full-time">Tiempo completo</option>
                <option value="part-time">Tiempo parcial</option>
                <option value="freelance">Freelance</option>
              </select>
            </div>
          </div>
          <div className="job__wrapper">
            {jobData
              ?.filter((job) => {
                if (searchTerm === "") return job;
                if (
                  job.position.toLowerCase().includes(searchTermValue) ||
                  job.company.toLowerCase().includes(searchTermValue)
                )
                  return job;
              })
              .map((item) => (
                <div className="job__item" key={item.id}>
                  <img src={item.logo} alt="item.logo" />
                  <div className="job__content">
                    <h6>
                      {item.postedAt} - {item.contract}
                    </h6>
                    <h1>
                      <Link to={`/jobs/${item.position}`}>{item.position}</Link>
                    </h1>
                  </div>
                  <p>{item.company}</p>
                  <div className="location">
                    <p>
                      Location: <span>{item.location}</span>
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
