

const MeetingPage = async ({ params }) => {

  const {id} = await params
  return (
    <div>
      <span>{id}</span>
    </div>
  );
};

export default MeetingPage;
