import { useEffect, useState } from "react";
import PageTitle from "../components/ui/PageTitle";
import { getAssessments } from "../server/assessment";
import RecentActivity from "../components/dashboard/RecentActivity"
import CustomSkeleton from "../components/ui/CustomSkeleton";

export default function AssessmentList() {

    const [isLoading, setIsLoading] = useState(false);
    const [assessments, setAssessments] = useState();

    useEffect(() => {
        const getAllAssessments = async () => {
            setIsLoading(true);
            try {
                const data = await getAssessments(status);
                setAssessments(data?.data);
            } catch (error) {
                console.error("Error fetching assessments:", error);
            } finally {
                setIsLoading(false);
            }
        }
        getAllAssessments()
    }, [])

    return (
        <>
            <PageTitle title={"Assessment List"} subtitle={""} />
            <div className="p-6">
                <CustomSkeleton isLoading={isLoading}>
                    {
                        assessments?.recentAssessments?.length > 0 ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {assessments?.recentAssessments?.map((item) => (
                                <RecentActivity
                                    key={item._id}
                                    status="mine"
                                    assessmentData={[item]}
                                />
                            ))}
                        </div> : <div className="text-subTitleClr text-base text-center">No Assessment Found</div>
                    }

                </CustomSkeleton >
            </div >
        </>
    )
}
