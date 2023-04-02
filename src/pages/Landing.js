import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>

      <div className="container page">
        {/* Info */}
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum illo
            officia fugiat omnis nobis ex veritatis doloremque fugit eaque
            officiis. Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Mollitia, voluptates quaerat incidunt quibusdam, error ea blanditiis
            expedita quo voluptatem minus assumenda tempora perferendis saepe
            quis iure vitae animi. Iusto, dolores?
          </p>
          <Link to="/register" className="btn btn-hero">
            Login/Regiter
          </Link>
        </div>

        {/* Hero Image */}

        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
