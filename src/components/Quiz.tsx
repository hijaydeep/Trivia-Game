import React, { useEffect, useState } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner"; // Import specific spinner type

const Quiz: React.FC = () => {
  const [index, setIndex] = useState<number>(0);
  const [question, setQuestion] = useState<string>("");
  const [option, setOption] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>(""); // Track selected answer
  const [correctAnswer, setCorrectAnswer] = useState<string>(""); // Store correct answer
  const [loading, setLoading] = useState<boolean>(true); // Add loading state
  const [lock, setLock] = useState<boolean>(false); // Locking after an option is selected
  const [score, setScore] = useState<number>(0);
  const [result, setResult] = useState<boolean>(false); // To display results

  const totalQuestions: number = 10;

  // Fetch question data
  const fetchData = async (): Promise<void> => {
    try {
      setLoading(true); // Set loading to true before fetching
      const response = await axios.get("https://opentdb.com/api.php?amount=1");
      if (response.data.response_code === 0) {
        const result = response.data.results[0];
        const allOptions = [
          ...result.incorrect_answers,
          result.correct_answer,
        ].sort(() => Math.random() - 0.5); // Shuffle the options
        setQuestion(result.question);
        setOption(allOptions);
        setCorrectAnswer(result.correct_answer); // Set correct answer
      } else {
        fetchData(); // Fetch a new question in case of an error
      }
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const handleOptionClick = (optionText: string): void => {
    if (lock) return; // Prevent changing option if locked
    setSelectedAnswer(optionText); // Set the selected answer
    setLock(true); // Lock the selection
  };

  const handleShowResults = (): void => {
    setResult(true); // End the quiz and show results
  };

  const handleNext = (): void => {
    if (selectedAnswer === correctAnswer) {
      setScore((prevScore) => prevScore + 1); // Update the score if the answer is correct
    }

    if (index < totalQuestions - 1) {
      setIndex((prevIndex) => prevIndex + 1);
      setLock(false); // Unlock options for the next question
      setSelectedAnswer("");
      fetchData(); // Fetch a new question
    } else {
      setResult(true); // End the quiz and show results
    }
  };

  const handleReset = (): void => {
    setIndex(0);
    setScore(0);
    setLock(false);
    setResult(false);
    setSelectedAnswer("");
    fetchData(); // Restart quiz
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-12 col-lg-8">
          <div className="card text-center">
            <div className="shadow bg-body-tertiary rounded">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">Trivia Game</h5>
                {!result && (
                  <span className="index text-bold text-secondary">
                    {index + 1} of {totalQuestions} Questions
                  </span>
                )}
              </div>
              {/* Check if the result is true to display score */}
              {!result ? (
                <div className="card-body bg-light">
                  {loading ? (
                    // React-loader-spinner for loading indicator
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ height: "200px" }}
                    >
                      <ThreeDots
                        height="80"
                        width="80"
                        radius="9"
                        color="blue"
                        ariaLabel="three-dots-loading"
                        visible={true}
                      />
                    </div>
                  ) : (
                    <>
                      <h4 className="card-title mb-4 text-start">
                        {index + 1}. {question}
                      </h4>
                      <ul className="list-unstyled">
                        {option.map((optionText, idx) => (
                          <li
                            key={idx}
                            className={
                              lock
                                ? optionText === correctAnswer
                                  ? "correct"
                                  : optionText === selectedAnswer
                                  ? "wrong"
                                  : ""
                                : selectedAnswer === optionText
                                ? "selected"
                                : ""
                            }
                            onClick={() => handleOptionClick(optionText)}
                          >
                            {optionText}
                          </li>
                        ))}
                      </ul>
                      {/* Conditionally render the "Next" or "Results" button only if an answer is selected */}
                      {selectedAnswer && (
                        <div className="d-grid col-3 mx-auto mt-4">
                          {index + 1 === totalQuestions ? (
                            <button
                              className="btn btn-outline-primary rounded"
                              onClick={handleShowResults}
                            >
                              Result
                            </button>
                          ) : (
                            <button
                              className="btn btn-outline-primary rounded"
                              onClick={handleNext}
                            >
                              Next
                            </button>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ) : (
                // Show final score and "Play Again" button at the end
                <div className="card-body bg-light">
                  <h2>
                    You Scored {score} out of {totalQuestions}
                  </h2>
                  <button
                    className="btn btn-primary mt-2"
                    onClick={handleReset}
                  >
                    Play Again
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="container">
    //   <h1>Trivia Game</h1>
    //   {loading ? (
    //      <div className="d-flex justify-content-center align-items-center my-4">
    //      <ThreeDots color="#553f9d" height={80} width={80} />
    //    </div>
    //    manifest.json
    // {
    //   "short_name": "React App",
    //   "name": "Create React App Sample",
    //   "icons": [
    //     {
    //       "src": "favicon.ico",
    //       "sizes": "64x64 32x32 24x24 16x16",
    //       "type": "image/x-icon"
    //     },
    //     {
    //       "src": "logo192.png",
    //       "type": "image/png",
    //       "sizes": "192x192"
    //     },
    //     {
    //       "src": "logo512.png",
    //       "type": "image/png",
    //       "sizes": "512x512"
    //     }
    //   ],
    //   "start_url": ".",
    //   "display": "standalone",
    //   "theme_color": "#000000",
    //   "background_color": "#ffffff"
    // }
  );
};

export default Quiz;
