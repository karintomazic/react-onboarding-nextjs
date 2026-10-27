import Spinner from "@/components/atoms/Spinner/Spinner";
import SingleColumn from "@/components/templates/SingleColumn/SingleColumn";

export default function LoadingPage() {
  return (
    <SingleColumn>
      <Spinner />
    </SingleColumn>
  );
}
