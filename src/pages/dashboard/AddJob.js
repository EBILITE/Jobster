import { FormRow } from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import FormRowSelect from "../../components/FormRowSelect";
import {
  clearValues,
  createJob,
  editJob,
  handleChange,
} from "../../features/job/jobSlice";
import { useEffect } from "react";
const AddJob = () => {
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    isEditing,
    editJobId,
  } = useSelector((store) => store.job);

  const { user } = useSelector((store) => store.user);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      toast.error("Please fill out all fields");
      return;
    }
    if (isEditing) {
      dispatch(
        editJob({
          jobId: editJobId,
          job: {
            position,
            company,
            jobLocation,
            jobType,
            jobTypeOptions,
            status,
          },
        })
      );
      return;
    }
    dispatch(createJob({ position, company, jobLocation, jobType, status }));
  };

  const handlejobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // console.log(name, value);
    dispatch(handleChange({ name, value }));
  };

  useEffect(() => {
    // eventually will check for isEditing
    if (!isEditing) {
      // Meaning if we are not editing , meaing when its false
      dispatch(handleChange({ name: "jobLocation", value: user.location }));
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edit job" : "add job"}</h3>
        <div className="form-center">
          {/* POSITION */}
          <FormRow
            type="text"
            name="position"
            value={position}
            handleChange={handlejobInput}
          />

          <FormRow
            type="text"
            name="company"
            value={company}
            handleChange={handlejobInput}
          />

          <FormRow
            type="text"
            name="jobLocation"
            labelText="Job location"
            value={jobLocation}
            handleChange={handlejobInput}
          />

          <FormRowSelect
            name="status"
            value={status}
            handleChange={handlejobInput}
            list={statusOptions}
          />

          <FormRowSelect
            name="jobType"
            labelText="job type"
            value={jobType}
            handleChange={handlejobInput}
            list={jobTypeOptions}
          />

          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={() => dispatch(clearValues())}
            >
              clear
            </button>
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
