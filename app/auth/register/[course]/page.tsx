import RegistrationForm from "@/components/RegistrationForm";

export default function RegisterCoursePage({
  params,
}: {
  params: { course: string };
}) {
  return <RegistrationForm course={params.course} />;
}