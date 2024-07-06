import { Link, useLocation } from "@remix-run/react";
import clsx from "clsx";

const Navbar = () => {
  const { pathname } = useLocation();
  const leaves = pathname.split("/");
  const isPhilisophy = leaves.some((l) => l === "philosophy");
  const isMovies = leaves.some((l) => l === "movies");
  const isHome = leaves.every((l) => !l.length);

  return (
    <div className="flex justify-around items-end pt-12 border-b border-b-[hsl(220,5%,24%)]">
      <Link
        to="/philosophy"
        style={{ marginLeft: -20 }}
        className={clsx(
          "flex justify-center mb-3 pb-1 text-base sm:text-2xl text-[hsl(220,20%,97%)] border-b hover:border-soft-white",
          isPhilisophy ? "border-soft-white" : "border-transparent"
        )}
      >
        Philosophy
      </Link>
      <Link
        to="/"
        className={clsx(
          "w-16 h-16 sm:w-[100px] sm:h-[100px] absolute my-0 mx-auto -mb-8 rounded-[50%] transition-shadow border-4 border-[hsl(220,15%,0%)] hover:shadow-[0px_0px_8px_#fffdf8,_0px_2px_8px_#fffdf8,_0px_3px_8px_#fffdf8,_inset_0px_2px_8px_#fffdf8]",
          isHome
            ? "shadow-[0px_0px_8px_#fffdf8,_0px_2px_8px_#fffdf8,_0px_3px_8px_#fffdf8,_inset_0px_2px_8px_#fffdf8]"
            : ""
        )}
      >
        <img
          className="w-16 h-16 sm:h-[100px] sm:w-[100px] rounded-[50%] flex hover:-mb-8"
          src="/7306.jpeg"
          alt="logo"
        />
      </Link>
      <Link
        to="/movies"
        className={clsx(
          "flex justify-center mb-3 pb-1 text-base sm:text-2xl text-[hsl(220,20%,97%)] border-b hover:border-soft-white",
          isMovies ? "border-soft-white" : "border-transparent"
        )}
      >
        Movies
      </Link>
    </div>
  );
};

// const LogoImage = styled.img`
//   width: 100px;
//   border-radius: 50%;
//   display: flex;

//   @media (max-width: 550px) {
//     width: 60px;
//     height: 60px;
//   }
// `;

// const StyledLink = styled(NavLink)`
//   --soft-white: #fffefc;
//   display: flex;
//   justify-content: center;
//   margin-bottom: 12px;
//   padding-bottom: 4px;
//   font-size: 24px;
//   text-decoration: none;
//   color: hsl(220, 20%, 97%);

//   @media (max-width: 550px) {
//     font-size: 1rem;
//   }

//   &:hover {
//     border-bottom: 2px #fffdf8 solid;
//     box-shadow: 0 24px 20px -20px #fffdf8;
//     margin-bottom: 10px;
//   }

//   &.active {
//     border-bottom: 2px #fffdf8 solid;
//     box-shadow: 0 24px 20px -20px var(soft-white);
//     margin-bottom: 10px;
//   }
// `;

// const Logo = styled(NavLink)`
//   --soft-white: #fffdf8;
//   width: 100px;
//   height: 100px;
//   position: absolute;
//   margin: 0 auto;
//   margin-bottom: -32px;
//   border-radius: 50%;
//   transition: box-shadow 60ms ease-out;
//   border: 4px solid hsl(220, 15%, 0%);

//   @media (max-width: 550px) {
//     width: 60px;
//     height: 60px;
//   }

//   &:hover {
//     margin-bottom: -32px;
//     box-shadow: 0px 0px 8px #fffdf8, 0px 2px 8px var(--soft-white),
//       0px 3px 8px var(--soft-white), inset 0px 2px 8px var(--soft-white);
//   }

//   &.active {
//     /* margin-bottom: -36px; */
//     /* border: 4px solid hsl(220, 15%, 4%); */
//     /* box-shadow: 0 2px 8px 0px var(--soft-white),
//       0px 2px 6px 0px var(--soft-white); */
//     /*  4px -2px 9px var(--soft-white), inset 0px 0 9px var(--soft-white); */
//   }
// `;

export default Navbar;
