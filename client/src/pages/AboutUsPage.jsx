import styles from './AboutUsPage.module.css';
import PageLayout from '../layout/PageLayout';
import { Link } from 'react-router-dom';

function AboutUsPage() {
  return (
    <PageLayout>
      <div className={styles.container}>
        {/* About Us Section */}
        <section className={styles.aboutSection}>
          <h1 className={styles.mainTitle}>About Us</h1>

          <div className={styles.aboutGrid}>
            <div>
              <h2 className={styles.accentText}>About the</h2>
              <h3 className={styles.sectionTitle}>Mission</h3>
              <p className={styles.paragraph}>
                The UOWD Tech Club is dedicated to fostering a collaborative and
                inclusive environment for students passionate about technology
                and innovation.
              </p>
            </div>

            <div className={styles.missionCard}>
              <div className={styles.missionCardGrid}>
                <div>
                  <h4 className={styles.cardTitle}>Learning & Innovation</h4>
                  <p className={styles.cardText}>
                    Access resources, workshops, and projects in software,
                    cybersecurity, data science, and emerging tech.
                  </p>
                </div>

                <div>
                  <h4 className={styles.cardTitle}>Career Growth</h4>
                  <p className={styles.cardText}>
                    Get career guidance, resume support, and connect with
                    industry professionals.
                  </p>
                </div>

                <div>
                  <h4 className={styles.cardTitle}>Community</h4>
                  <p className={styles.cardText}>
                    Join a diverse, supportive network to share knowledge and
                    collaborate on projects.
                  </p>
                </div>

                <div>
                  <h4 className={styles.cardTitle}>Ethics in Tech</h4>
                  <p className={styles.cardText}>
                    Advocate for ethical technology practices, digital privacy,
                    and cybersecurity awareness.
                  </p>
                </div>

                <div>
                  <h4 className={styles.cardTitle}>Empowerment</h4>
                  <p className={styles.cardText}>
                    Gain skills and confidence through mentorship, guest
                    lectures, and industry partnerships.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.membershipSection}>
            <h2 className={styles.membershipTitle}>Membership</h2>
            <p className={styles.membershipText}>
              The UOWD Tech Club is open to all students, offering significant
              benefits particularly to those studying Computer Science and
              Engineering. We provide targeted activities, workshops, and
              resources that align with your academic and career goals. However,
              any student with a passion for technology and innovation is
              welcome to join and contribute to the clubs vibrant and diverse
              community.
            </p>
          </div>
        </section>

        {/* Team Section */}
        <section className={styles.teamSection}>
          <div className={styles.teamHeader}>
            <h2 className={styles.teamSubtitle}>Meet the Team</h2>
            <h1 className={styles.teamTitle}>Our Leaders</h1>
          </div>

          <div className={styles.presidentContainer}>
            <div className={styles.profileContainer}>
              <div className={styles.photoContainer}>
                <img
                  src="https://placehold.co/128x128/111111/111111"
                  alt="President portrait placeholder"
                  className={styles.photo}
                />
              </div>
              <div className={styles.roleLabel}>
                <p className={styles.roleText}>President</p>
              </div>
              <p className={styles.personName}>Name</p>
            </div>
          </div>

          {/* Vice President and Secretary - Desktop */}
          <div className={styles.executivesContainer}>
            <div className={styles.profileContainer}>
              <div className={styles.photoContainer}>
                <img
                  src="https://placehold.co/128x128/111111/111111"
                  alt="Vice President portrait placeholder"
                  className={styles.photo}
                />
              </div>
              <div className={styles.roleLabel}>
                <p className={styles.roleText}>Vice President</p>
              </div>
              <p className={styles.personName}>Name</p>
            </div>

            <div className={styles.profileContainer}>
              <div className={styles.photoContainer}>
                <img
                  src="https://placehold.co/128x128/111111/111111"
                  alt="Secretary portrait placeholder"
                  className={styles.photo}
                />
              </div>
              <div className={styles.roleLabel}>
                <p className={styles.roleText}>Secretary</p>
              </div>
              <p className={styles.personName}>Name</p>
            </div>
          </div>

          {/* Department Heads - Desktop */}
          <div className={styles.departmentHeadsContainer}>
            <div className={styles.profileContainer}>
              <div className={styles.photoContainer}>
                <img
                  src="https://placehold.co/128x128/111111/111111"
                  alt="Head of Web Dev portrait placeholder"
                  className={styles.photo}
                />
              </div>
              <div className={styles.roleLabel}>
                <p className={styles.roleText}>Head of Web Dev</p>
              </div>
              <p className={styles.personName}>Name</p>
            </div>

            <div className={styles.profileContainer}>
              <div className={styles.photoContainer}>
                <img
                  src="https://placehold.co/128x128/111111/111111"
                  alt="Head of Events portrait placeholder"
                  className={styles.photo}
                />
              </div>
              <div className={styles.roleLabel}>
                <p className={styles.roleText}>Head of Events</p>
              </div>
              <p className={styles.personName}>Name</p>
            </div>

            <div className={styles.profileContainer}>
              <div className={styles.photoContainer}>
                <img
                  src="https://placehold.co/128x128/111111/111111"
                  alt="Head of Media portrait placeholder"
                  className={styles.photo}
                />
              </div>
              <div className={styles.roleLabel}>
                <p className={styles.roleText}>Head of Media</p>
              </div>
              <p className={styles.personName}>Name</p>
            </div>

            <div className={styles.profileContainer}>
              <div className={styles.photoContainer}>
                <img
                  src="https://placehold.co/128x128/111111/111111"
                  alt="Head of Engineering portrait placeholder"
                  className={styles.photo}
                />
              </div>
              <div className={styles.roleLabel}>
                <p className={styles.roleText}>Head of Engineering</p>
              </div>
              <p className={styles.personName}>Name</p>
            </div>

            <div className={styles.profileContainer}>
              <div className={styles.photoContainer}>
                <img
                  src="https://placehold.co/128x128/111111/111111"
                  alt="Head of AI Team portrait placeholder"
                  className={styles.photo}
                />
              </div>
              <div className={styles.roleLabel}>
                <p className={styles.roleText}>Head of AI Team</p>
              </div>
              <p className={styles.personName}>Name</p>
            </div>

            <div className={styles.profileContainer}>
              <div className={styles.photoContainer}>
                <img
                  src="https://placehold.co/128x128/111111/111111"
                  alt="Head of Cybersecurity portrait placeholder"
                  className={styles.photo}
                />
              </div>
              <div className={styles.roleLabel}>
                <p className={styles.roleText}>Head of Cybersecurity</p>
              </div>
              <p className={styles.personName}>Name</p>
            </div>
          </div>

          {/* Deputies - Desktop */}
          <div className={styles.deputiesContainer}>
            <div className={styles.profileContainer}>
              <div className={styles.photoContainer}>
                <img
                  src="https://placehold.co/128x128/111111/111111"
                  alt="Deputy of Web Dev portrait placeholder"
                  className={styles.photo}
                />
              </div>
              <div className={styles.roleLabel}>
                <p className={styles.roleText}>Deputy of Web Dev</p>
              </div>
              <p className={styles.personName}>Name</p>
            </div>

            <div className={styles.profileContainer}>
              <div className={styles.photoContainer}>
                <img
                  src="https://placehold.co/128x128/111111/111111"
                  alt="Deputy of Events portrait placeholder"
                  className={styles.photo}
                />
              </div>
              <div className={styles.roleLabel}>
                <p className={styles.roleText}>Deputy of Events</p>
              </div>
              <p className={styles.personName}>Name</p>
            </div>

            <div className={styles.profileContainer}>
              <div className={styles.photoContainer}>
                <img
                  src="https://placehold.co/128x128/111111/111111"
                  alt="Deputy of Media portrait placeholder"
                  className={styles.photo}
                />
              </div>
              <div className={styles.roleLabel}>
                <p className={styles.roleText}>Deputy of Media</p>
              </div>
              <p className={styles.personName}>Name</p>
            </div>

            <div className={styles.profileContainer}>
              <div className={styles.photoContainer}>
                <img
                  src="https://placehold.co/128x128/111111/111111"
                  alt="Deputy of Engineering portrait placeholder"
                  className={styles.photo}
                />
              </div>
              <div className={styles.roleLabel}>
                <p className={styles.roleText}>Deputy of Engineering</p>
              </div>
              <p className={styles.personName}>Name</p>
            </div>

            <div className={styles.profileContainer}>
              <div className={styles.photoContainer}>
                <img
                  src="https://placehold.co/128x128/111111/111111"
                  alt="Deputy of AI Team portrait placeholder"
                  className={styles.photo}
                />
              </div>
              <div className={styles.roleLabel}>
                <p className={styles.roleText}>Deputy of AI Team</p>
              </div>
              <p className={styles.personName}>Name</p>
            </div>

            <div className={styles.profileContainer}>
              <div className={styles.photoContainer}>
                <img
                  src="https://placehold.co/128x128/111111/111111"
                  alt="Deputy of Cybersecurity portrait placeholder"
                  className={styles.photo}
                />
              </div>
              <div className={styles.roleLabel}>
                <p className={styles.roleText}>Deputy of Cybersecurity</p>
              </div>
              <p className={styles.personName}>Name</p>
            </div>
          </div>

          {/* Mobile Top Executives */}
          <div className={styles.mobileExecutives}>
            <div className={styles.profileContainer}>
              <div className={styles.photoContainer}>
                <img
                  src="https://placehold.co/128x128/111111/111111"
                  alt="President portrait placeholder"
                  className={styles.photo}
                />
              </div>
              <div className={styles.roleLabel}>
                <p className={styles.roleText}>President</p>
              </div>
              <p className={styles.personName}>Name</p>
            </div>

            <div className={styles.profileContainer}>
              <div className={styles.photoContainer}>
                <img
                  src="https://placehold.co/128x128/111111/111111"
                  alt="Vice President portrait placeholder"
                  className={styles.photo}
                />
              </div>
              <div className={styles.roleLabel}>
                <p className={styles.roleText}>Vice President</p>
              </div>
              <p className={styles.personName}>Name</p>
            </div>

            <div className={styles.profileContainer}>
              <div className={styles.photoContainer}>
                <img
                  src="https://placehold.co/128x128/111111/111111"
                  alt="Secretary portrait placeholder"
                  className={styles.photo}
                />
              </div>
              <div className={styles.roleLabel}>
                <p className={styles.roleText}>Secretary</p>
              </div>
              <p className={styles.personName}>Name</p>
            </div>
          </div>

          {/* All Executives Button */}
          <div className={styles.buttonContainer}>
            <Link to="/all-executives" className={styles.button}>
              All Executives
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={styles.buttonIcon}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}

export default AboutUsPage;
