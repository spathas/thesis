export const COURSE_STATES = {
  0: 'purchased',
  1: 'activated',
  2: 'deactivated',
};

export const normalizeOwnedCourse = (web3) => (course, ownedCourse) => {
  return {
    ...course,
    ownedCourse: ownedCourse.id,
    proof: ownedCourse.proof,
    owner: ownedCourse.owner,
    price: web3.utils.fromWei(ownedCourse.price),
    state: COURSE_STATES[ownedCourse.state],
  };
};
