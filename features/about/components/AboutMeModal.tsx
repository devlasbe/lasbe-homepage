import { carrerDataList, profileDataList, projectDataList } from "../constants";
import Carrer from "./Carrer";
import Layout from "./Layout";
import Profile from "./Profile";
import Project from "./Project";

export default function AboutMeModal() {
  return (
    <div className="flex flex-col gap-12 w-[95vw] md:w-[750px] px-4 py-12 bg-neutral-100">
      <Layout title="PROFILE" headerColorClassName="bg-my-orange">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {profileDataList.map((data, idx) => (
            <Profile {...data} idx={idx} key={`profile-${data.label}`} />
          ))}
        </div>
      </Layout>
      <Layout title="PROJECT" headerColorClassName="bg-my-green" isUseBgColor={false}>
        <div className="flex flex-col gap-6 w-full">
          {projectDataList.map((data, idx) => (
            <Project {...data} idx={idx} key={`project-${data.title}`} />
          ))}
        </div>
      </Layout>
      <Layout title="CAREER" headerColorClassName="bg-my-blue">
        <>
          {carrerDataList.map((data) => (
            <Carrer key={`carrer-${data.company}`} {...data} />
          ))}
        </>
      </Layout>
    </div>
  );
}
