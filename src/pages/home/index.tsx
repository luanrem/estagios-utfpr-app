import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";

import NavBar from "../../components/NavBar";
import JobDetails from "../../components/JobDetails";
import JobCards from "../../components/JobCards";
import Pagination from "../../components/Pagination";

import { Job } from "../../interfaces/job";
import { PageInfo } from "../../interfaces/pageInfo";

import { Container } from "./styles";
import { GET_JOBS, GET_JOB } from "./queries";

function Home() {
  const [jobs, setJobs] = useState<Job[]>();
  const [jobCode, setJobCode] = useState();
  const [page, setPage] = useState(0);
  const [pageInfo, setPaginationInfo] = useState<PageInfo>();

  const { loading, error, data } = useQuery(GET_JOBS, { variables: { page } });
  const jobDetails = useQuery(GET_JOB, { variables: { code: jobCode } });

  useEffect(() => {
    if (data && !error) {
      setPaginationInfo(data.jobs.pageInfo);
      setJobs(data.jobs.nodes);
      if (!data.jobs.nodes.len) {
        setJobCode(data.jobs.nodes[0].code);
      }
    }
  }, [data, error]);

  return (
    <div style={{ marginBottom: 50 }}>
      <NavBar />
      {!loading && !error && (
        <h3
          style={{
            marginRight: 20,
            color: "#777",
            fontWeight: "normal",
            fontSize: "0.95rem",
            textAlign: "end",
            marginBottom: 10
          }}
        >
          Página {page + 1} de {pageInfo?.total} vagas{" "}
        </h3>
      )}
      <Container>
        {error ? (
          <p>Oops algo deu errado :(</p>
        ) : (
          <>
            <JobCards
              jobs={jobs}
              loading={loading && jobDetails.loading}
              onJobClick={setJobCode}
              selectedJobCode={jobCode}
            />
            <JobDetails
              job={jobDetails?.data?.job}
              loading={loading && jobDetails.loading}
            />
          </>
        )}
      </Container>
      {pageInfo && (
        <Pagination
          hasPreviousPage={pageInfo.hasPreviousPage}
          hasNextPage={pageInfo.hasNextPage}
          currentPage={pageInfo.currentPage}
          onPageChange={(page: number) => {
            setPage(page);
            window.scrollTo(0, 0);
          }}
        />
      )}
    </div>
  );
}

export default Home;