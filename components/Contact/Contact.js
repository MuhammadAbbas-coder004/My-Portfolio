import { useState, useEffect, useRef } from "react";
import Filter from "bad-words";
import toast, { Toaster } from "react-hot-toast";
import Fade from "react-reveal/Fade";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useSfx } from "utils/use-sfx";
import mail from "./mailer";
import styles from "./Contact.module.scss";
import { MENULINKS } from "../../constants";

const filter = new Filter();
filter.removeWords("hell", "god", "shit");

const toastOptions = {
  style: {
    borderRadius: "10px",
    background: "#333",
    color: "#fff",
    fontFamily: "sans-serif",
  },
};

const empty = () =>
  toast.error("Please fill the required fields", {
    id: "error",
  });

const error = () =>
  toast.error("Error sending your message", {
    id: "error",
  });

const success = () =>
  toast.success("Message sent successfully", {
    id: "success",
  });

const Contact = () => {
  const initialState = { name: "", email: "", message: "" };
  const [formData, setFormData] = useState(initialState);
  const [mailerResponse, setMailerResponse] = useState("not initiated");
  const buttonElementRef = useRef(null);
  const sectionRef = useRef(null);
  const sfx = useSfx();

  const handleChange = ({ target }) => {
    const { id, value } = target;
    setFormData((prevVal) => {
      if (
        value.trim() !== prevVal[id] &&
        value.trim().length > prevVal[id].trim().length
      ) {
        return { ...prevVal, [id]: filter.clean(value.trim()) };
      } else {
        return { ...prevVal, [id]: value };
      }
    });
  };

  const emptyForm = () => {
    setFormData(initialState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, message } = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
    };

    if (name === "" || email === "" || message === "") {
      empty();
      return;
    }

    sfx.play("charge-up", { rate: 2 });

    mail({ name, email, message })
      .then((res) => {
        if (res.status === 200) {
          setMailerResponse("success");
          emptyForm();
        } else {
          setMailerResponse("error");
        }
      })
      .catch((err) => {
        setMailerResponse("error");
        console.error(err);
      });
  };

  useEffect(() => {
    if (mailerResponse === "not initiated") return;

    if (mailerResponse === "success") {
      success();
    } else if (mailerResponse === "error") {
      error();
    }

    const timer = setTimeout(() => {
      setMailerResponse("not initiated");
    }, 10000);
    return () => clearTimeout(timer);
  }, [mailerResponse]);

  useEffect(() => {
    const buttonEl = buttonElementRef.current;
    const handleButtonClick = (e) => {
      if (!buttonElementRef.current.classList.contains("active")) {
        buttonElementRef.current.classList.add("active");

        gsap.to(buttonElementRef.current, {
          keyframes: [
            {
              "--left-wing-first-x": 50,
              "--left-wing-first-y": 100,
              "--right-wing-second-x": 50,
              "--right-wing-second-y": 100,
              duration: 0.2,
              onComplete() {
                gsap.set(buttonElementRef.current, {
                  "--left-wing-first-y": 0,
                  "--left-wing-second-x": 40,
                  "--left-wing-second-y": 100,
                  "--left-wing-third-x": 0,
                  "--left-wing-third-y": 100,
                  "--left-body-third-x": 40,
                  "--right-wing-first-x": 50,
                  "--right-wing-first-y": 0,
                  "--right-wing-second-x": 60,
                  "--right-wing-second-y": 100,
                  "--right-wing-third-x": 100,
                  "--right-wing-third-y": 100,
                  "--right-body-third-x": 60,
                });
              },
            },
            {
              "--left-wing-third-x": 20,
              "--left-wing-third-y": 90,
              "--left-wing-second-y": 90,
              "--left-body-third-y": 90,
              "--right-wing-third-x": 80,
              "--right-wing-third-y": 90,
              "--right-body-third-y": 90,
              "--right-wing-second-y": 90,
              duration: 0.2,
            },
            {
              "--rotate": 50,
              "--left-wing-third-y": 95,
              "--left-wing-third-x": 27,
              "--right-body-third-x": 45,
              "--right-wing-second-x": 45,
              "--right-wing-third-x": 60,
              "--right-wing-third-y": 83,
              duration: 0.25,
            },
            {
              "--rotate": 60,
              "--plane-x": -8,
              "--plane-y": 40,
              duration: 0.2,
            },
            {
              "--rotate": 40,
              "--plane-x": 45,
              "--plane-y": -300,
              "--plane-opacity": 0,
              duration: 0.375,
              onComplete() {
                setTimeout(() => {
                  buttonElementRef.current.removeAttribute("style");
                  gsap.fromTo(
                    buttonElementRef.current,
                    {
                      opacity: 0,
                      y: -8,
                    },
                    {
                      opacity: 1,
                      y: 0,
                      clearProps: true,
                      duration: 0.3,
                      onComplete() {
                        buttonElementRef.current.classList.remove("active");
                      },
                    },
                  );
                }, 1800);
              },
            },
          ],
        });

        gsap.to(buttonElementRef.current, {
          keyframes: [
            {
              "--text-opacity": 0,
              "--border-radius": 0,
              "--left-wing-background": "#9f55ff",
              "--right-wing-background": "#9f55ff",
              duration: 0.11,
            },
            {
              "--left-wing-background": "#8b31ff",
              "--right-wing-background": "#8b31ff",
              duration: 0.14,
            },
            {
              "--left-body-background": "#9f55ff",
              "--right-body-background": "#9f55ff",
              duration: 0.25,
              delay: 0.1,
            },
            {
              "--trails-stroke": 171,
              duration: 0.22,
              delay: 0.22,
            },
            {
              "--success-opacity": 1,
              "--success-x": 0,
              duration: 0.2,
              delay: 0.15,
            },
            {
              "--success-stroke": 0,
              duration: 0.15,
            },
          ],
        });
      }
    };

    buttonEl.addEventListener("click", handleButtonClick);
    return () => buttonEl.removeEventListener("click", handleButtonClick);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "none" } });

    tl.from(
      sectionRef.current.querySelectorAll(".staggered-reveal"),
      { opacity: 0, duration: 0.5, stagger: 0.5 },
      "<",
    );

    const st = ScrollTrigger.create({
      trigger: sectionRef.current.querySelector(".contact-wrapper"),
      start: "100px bottom",
      end: "center center",
      scrub: 0,
      animation: tl,
    });

    return () => {
      tl.kill();
      st.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id={MENULINKS[4].ref}
      aria-label="Contact"
      className="mt-30 w-full relative select-none bg-black pt-20 sm:pt-10 md:pt-5 lg:pt-1 pb-20"
    >
      <div>
        <Toaster toastOptions={toastOptions} />
      </div>
      <div className="section-container flex flex-col justify-center">
        <div className="flex flex-col contact-wrapper">
          <div className="flex flex-col">
            <p className="uppercase tracking-widest text-gray-light-1 staggered-reveal">
              CONTACT
            </p>
            <h2 className="text-6xl mt-2 font-medium text-gradient w-fit staggered-reveal">
              Contact
            </h2>
          </div>
          <p className="text-[1.65rem] font-medium md:max-w-lg w-full mt-2 staggered-reveal">
            Get In Touch.{" "}
          </p>
        </div>

        <form className="pt-10 sm:mx-auto sm:w-[30rem] md:w-[35rem] staggered-reveal">
          <Fade bottom distance={"4rem"}>
            <div className="relative">
              <input
                type="text"
                id="name"
                className="block w-full h-12 sm:h-14 px-4 text-xl sm:text-2xl font-mono outline-none border-2 border-purple bg-transparent rounded-[0.6rem] transition-all duration-200"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <label
                htmlFor="name"
                className="absolute top-0 left-0 h-full flex items-center pl-4 text-lg font-mono transform transition-all"
              >
                Name
              </label>
            </div>

            <div className="relative mt-14">
              <input
                type="email"
                id="email"
                className="block w-full h-12 sm:h-14 px-4 text-xl sm:text-2xl font-mono outline-none border-2 border-purple bg-transparent rounded-[0.6rem] transition-all duration-200"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label
                htmlFor="email"
                className="absolute top-0 left-0 h-full flex items-center pl-4 text-lg font-mono transform transition-all"
              >
                Email
              </label>
            </div>

            <div className="relative mt-14">
              <textarea
                id="message"
                className="block w-full h-auto min-h-[10rem] max-h-[20rem] sm:h-14 py-2 px-4 text-xl sm:text-2xl font-mono outline-none border-2 border-purple bg-transparent rounded-[0.6rem] transition-all duration-200"
                value={formData.message}
                onChange={handleChange}
                required
              />
              <label
                htmlFor="message"
                className="absolute top-0 left-0 h-14 flex items-center pl-4 text-lg font-mono transform transition-all"
              >
                Message
              </label>
            </div>
          </Fade>
        </form>
        <div className="mt-9 mx-auto link">
          <button
            ref={buttonElementRef}
            className={styles.button}
            disabled={
              formData.name === "" ||
              formData.email === "" ||
              formData.message === ""
                ? true
                : false
            }
            onClick={handleSubmit}
          >
            <span className="flex items-center justify-center">
              <span className="mr-3 tracking-wider font-bold">SEND</span>
              <svg 
                className={styles.arrowIcon} 
                width="22" 
                height="22" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </span>
            <span className={styles.success}>
              <svg viewBox="0 0 16 16">
                <polyline points="3.75 9 7 12 13 5"></polyline>
              </svg>
              Sent
            </span>
            <svg className={styles.trails} viewBox="0 0 33 64">
              <path d="M26,4 C28,13.3333333 29,22.6666667 29,32 C29,41.3333333 28,50.6666667 26,60"></path>
              <path d="M6,4 C8,13.3333333 9,22.6666667 9,32 C9,41.3333333 8,50.6666667 6,60"></path>
            </svg>
            <div className={styles.plane}>
              <div className={styles.left} />
              <div className={styles.right} />
            </div>
          </button>
        </div>
      </div>
      <style jsx global>{`
        input,
        label,
        textarea {
          cursor: none;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        input,
        textarea {
          position: relative;
          background: rgba(139, 49, 255, 0.03);
        }

        input:hover,
        textarea:hover {
          box-shadow: 0 0 0.8rem rgba(139, 49, 255, 0.45), 0 0 2rem rgba(139, 49, 255, 0.1);
          border-color: #a855f7;
          transform: translateY(-2px);
          background: rgba(139, 49, 255, 0.05);
        }

        input:focus,
        textarea:focus {
          box-shadow: 0 0 1.2rem rgba(139, 49, 255, 0.5), 0 0 3rem rgba(139, 49, 255, 0.15), inset 0 0 0.5rem rgba(139, 49, 255, 0.05);
          border-color: #a855f7;
          background: rgba(139, 49, 255, 0.06);
          animation: inputPulseGlow 2s ease-in-out infinite;
        }

        @keyframes inputPulseGlow {
          0%, 100% {
            box-shadow: 0 0 1.2rem rgba(139, 49, 255, 0.5), 0 0 3rem rgba(139, 49, 255, 0.15);
          }
          50% {
            box-shadow: 0 0 1.5rem rgba(139, 49, 255, 0.65), 0 0 4rem rgba(139, 49, 255, 0.2);
          }
        }

        input:focus + label,
        input:valid + label {
          height: 50%;
          padding-left: 0;
          transform: translateY(-100%) scale(0.85);
          color: #a855f7;
          text-shadow: 0 0 10px rgba(139, 49, 255, 0.5);
          letter-spacing: 0.05em;
        }

        textarea:focus + label,
        textarea:valid + label {
          height: 17%;
          padding-left: 0;
          transform: translateY(-100%) scale(0.85);
          color: #a855f7;
          text-shadow: 0 0 10px rgba(139, 49, 255, 0.5);
          letter-spacing: 0.05em;
        }

        label {
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </section>
  );
};

export default Contact;
