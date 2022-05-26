import { Modal } from '@components/ui/common';
import { CourseHero, Curriculum, Keypoints } from '@components/ui/course';
import { Message } from '@components/ui/common';
import { BaseLayout } from '@components/ui/layout';
import { getAllCourses } from '@content/courses/fetcher';
import { useAccount, useOwnedCourse } from '@components/hooks/web3';

export default function Course({ course }) {
  const { account } = useAccount();
  const { ownedCourse } = useOwnedCourse(course, account.data);
  const courseState = ownedCourse.data?.state;
  // const courseState = 'activated';

  const isLocked = courseState === 'purchased' || courseState === 'deactivated';

  return (
    <>
      <div className='py-4'>
        <CourseHero
          hasOwner={!!ownedCourse.data}
          title={course.title}
          description={course.description}
          image={course.coverImage}
        />
      </div>
      <div>
        <Keypoints points={course.wsl} />
        {courseState && (
          <div className='max-w-5xl mx-auto'>
            {courseState === 'purchased' && (
              <Message type='warning'>
                Course is purchased and waiting for activation.
                <i className='block font-normal'>
                  In case of any question, please contact info@exmple.com
                </i>
              </Message>
            )}
            {courseState === 'activated' && (
              <Message type='success'>
                Course is activated. Enjoining the Course!
              </Message>
            )}
            {courseState === 'deactivated' && (
              <Message type='danger'>
                Course has being deactivated, due the incorect purchase data.
              </Message>
            )}
          </div>
        )}
        <Curriculum locked={isLocked} courseState={courseState} />
      </div>
      <Modal />
    </>
  );
}

export function getStaticPaths() {
  const { data } = getAllCourses();

  return {
    paths: data.map((c) => ({
      params: {
        slug: c.slug,
      },
    })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  const { data } = getAllCourses();
  const course = data.filter((c) => c.slug === params.slug)[0];

  return {
    props: {
      course,
    },
  };
}

Course.Layout = BaseLayout;
