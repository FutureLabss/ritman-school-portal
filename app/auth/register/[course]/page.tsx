import RegistrationForm from "@/components/RegistrationForm";


type Params = Promise<{ course: string }>;

export default async function RegisterCoursePage({
  params,
}: {
  params: Params;
}) {
  const { course } = await params;
  return <RegistrationForm course={course} />;
}
