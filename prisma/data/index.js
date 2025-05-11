/**
 * Centralized seed data for the application
 */
export const seedData = {
  // Permission types
  permissions: ["All", "Read", "Write", "Delete"],

  // University administration roles
  adminRoles: [
    "Super Admin",
    "General Secretary",
    "Department Head",
    "Program Coordinator",
  ],

  // Academic batches
  batches: [
    "Fall 2021",
    "Spring 2022",
    "Fall 2022",
    "Spring 2023",
    "Fall 2023",
  ],

  // Academic departments
  departments: [
    "Computer Science",
    "Electrical Engineering",
    "Science & Humanities",
    "Civil Engineering",
    "Mechanical Engineering",
    "Business Administration",
  ],

  // Faculty designations
  facultyDesignations: [
    "Assistant Professor",
    "Associate Professor",
    "Professor",
    "Lecturer",
    "Adjunct Professor",
    "Visiting Faculty",
  ],

  courses: [
    { name: "Data Structures", code: "CS101" },
    { name: "Algorithms", code: "CS102" },
    { name: "Operating Systems", code: "CS103" },
    { name: "Computer Networks", code: "CS104" },
    { name: "Database Management Systems", code: "CS105" },
    { name: "Software Engineering", code: "CS201" },
    { name: "Artificial Intelligence", code: "CS301" },
    { name: "Machine Learning", code: "CS401" },
  ],

  // Classroom discussions and assignments
  classroomThreads: [
    [
      {
        title: "Data Structures: Class Kick-off",
        main_post:
          "Welcome to CS101 Data Structures! In this announcement, we introduce the course objectives, syllabus, key dates, and expectations. Get ready to explore arrays, linked lists, stacks, queues, and more as we embark on this exciting journey into the fundamental building blocks of computer science.",
        type: "announcement",
        user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
        replies: [
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "I'm excited to start learning about arrays and linked lists. The syllabus looks comprehensive and well-organized.",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "The course objectives seem clear. I'm particularly interested in how we'll explore stacks and queues in depth.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "Looking forward to this class! Understanding these data structures is fundamental for building efficient programs.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "I appreciate the key dates provided. I'll be sure to mark my calendar for exams and assignment deadlines.",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "The syllabus is detailed, and it gives a great roadmap for the semester. I'm excited about the hands-on labs as well.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "Does anyone know if there will be additional lab sessions for practical learning? That would be really beneficial.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "I'm eager to see how we will implement and test different data structures through assignments.",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Could someone share tips on how best to prepare for the midterms in this course? I'm already gathering study resources.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "I believe that mastering linked lists early on will make learning about more complex structures much easier.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "The announcement is very motivating. I’m excited to dive into both theoretical and practical aspects of data structures.",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "I appreciate the clear layout of the course schedule. It helps to know what to expect from the start.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "Does anyone have recommendations for textbooks or online resources to supplement our learning in this class?",
          },
        ],
      },
      {
        title: "Data Structures: Mid-Semester Update",
        main_post:
          "We are halfway through CS101 Data Structures. Please review this mid-semester update for information on exam schedules, assignment deadlines, and topics covered so far. Your feedback on the course so far is also welcome to help us improve your learning experience.",
        type: "announcement",
        user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
        replies: [
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "The mid-semester update is very helpful. I've been keeping track of the exam schedules, and the new deadlines look fair.",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "I appreciate the update on assignment deadlines. It gives me a chance to plan my projects better.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "The topics covered so far have been challenging but exciting. I'm learning a lot about stacks and queues.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "Does anyone have feedback on the recent homework? I found some parts particularly tricky.",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "The mid-semester update reminds me to review linked lists again. I need to brush up on some concepts before the exams.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "I’m looking forward to the upcoming exam. The update has clarified the exam format, which is reassuring.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "The feedback section is very useful. I plan to provide my suggestions regarding the course pacing in the next update.",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Mid-semester updates like this help me keep track of my progress and prepare for upcoming tests effectively.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "I wonder if we could get a detailed breakdown of the exam topics in the next update for better preparation.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "The announcement mentioned changes to assignment guidelines. Has anyone reviewed the updated instructions yet?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "I think the course is evolving well. The update makes it clear what we need to focus on for the rest of the semester.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "I appreciate the transparency in the mid-semester update. It gives a good picture of what's coming next.",
          },
        ],
      },
      {
        title: "Data Structures: Homework Q&A",
        main_post:
          "This discussion thread is dedicated to addressing questions regarding the latest homework assignment on linked lists and trees. Share your doubts, post solutions, and help each other overcome any challenges you're facing with the coursework.",
        type: "discussion",
        user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
        replies: [
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "I'm confused about how to properly remove a node from a linked list without causing memory leaks. Can someone explain the correct procedure?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "When removing a node, always check if it's the head. If it is, update the head pointer to the next node and free the removed node's memory. Using a dummy head can help simplify these edge cases.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "I don't understand how to implement tree traversals recursively for our homework. Which traversal method is best for binary search trees?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "For binary search trees, an in-order traversal is typically used as it outputs elements in sorted order. However, you can also use pre-order or post-order depending on what your assignment requires.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "What is the best way to handle edge cases in linked list deletion? I keep running into segmentation faults.",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Make sure to check for null pointers and consider using a dummy node to simplify deletion, especially for the head node. This can prevent segmentation faults by ensuring that all pointer accesses are valid.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "I'm also having trouble with the tree deletion algorithm. How do I handle the case where the node has two children?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "For a node with two children, replace it with its in-order successor (or predecessor) and then delete that successor, which will have at most one child. This maintains the binary search tree properties.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "Is it necessary to implement these data structures from scratch, or can we use libraries for our homework?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "For educational purposes, it's best to implement them from scratch. This deepens your understanding of pointers, memory management, and algorithmic complexity.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "I'm trying to debug a segmentation fault in my linked list code. What debugging techniques do you recommend?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Using tools like gdb to step through your code can be very effective. Additionally, inserting print statements to check pointer values at critical points can help identify the issue.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "Can anyone suggest online resources for extra practice on linked lists and trees?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Websites like GeeksforGeeks, LeetCode, and HackerRank offer a wide range of practice problems and detailed explanations on these topics.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "What is the difference between iterative and recursive tree traversal, and which one should I use?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Recursive traversal is simpler to implement, but iterative methods can be more efficient in terms of memory usage, especially for deep trees. Choose based on the complexity of your tree and available memory.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "How do I handle the case when a tree is unbalanced? Should I implement a self-balancing mechanism?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Self-balancing trees like AVL or red-black trees can help, but they are more complex. For your homework, focus on understanding the basic implementation first.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "Do you recommend any specific practices for writing clean code for these data structure implementations?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Yes, use descriptive variable names, modularize your code into functions, and add comments to explain your logic. This makes your code more maintainable and easier to debug.",
          },
        ],
      },
      {
        title: "Data Structures: Advanced Topics Discussion",
        main_post:
          "Discuss advanced topics in Data Structures such as balanced trees, graph algorithms, and hash tables. Share your insights, ask questions, and explore deeper aspects of data structures that go beyond the basics.",
        type: "discussion",
        user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
        replies: [
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "I'm curious about the differences between AVL trees and red-black trees. Which one would you recommend for faster lookup times?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "AVL trees are more strictly balanced, which can result in faster lookups. However, red-black trees offer better performance for insertion and deletion due to fewer rotations.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "How do graph algorithms benefit from specialized data structures? I'm particularly interested in their application in shortest path problems.",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Efficient graph algorithms rely on data structures like adjacency lists and matrices to represent graphs, which are essential for algorithms like Dijkstra's and Bellman-Ford.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "What are the best strategies to handle hash collisions in hash tables?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Common strategies include chaining, where each slot holds a linked list of entries, and open addressing, where collisions are resolved through probing. The choice depends on the load factor and performance needs.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "Can someone explain how self-balancing trees perform rotations during insertion?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "During insertion, self-balancing trees perform rotations to maintain balance. For example, in an AVL tree, if the balance factor becomes more than 1 or less than -1, single or double rotations are applied based on the structure of the subtree.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "I'm interested in learning more about probabilistic data structures like Bloom filters. How do they work in terms of space efficiency?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Bloom filters use multiple hash functions to map elements to a bit array, allowing for quick membership tests with a controllable rate of false positives, making them very space efficient.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "What are some emerging data structures that could improve search performance in large datasets?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Dynamic fusion trees and skip lists are some of the emerging structures that offer improved performance under certain conditions.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "How important is it to understand the theoretical basis of these advanced data structures for practical implementation?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "A solid theoretical understanding is critical; it helps in choosing the right structure for a given problem and optimizing its implementation.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "Do you have any recommended books or courses for a deeper dive into advanced data structures?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "I highly recommend 'Introduction to Algorithms' by Cormen et al. as well as online courses on Coursera and edX that cover advanced topics in data structures.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "How do advanced data structures like balanced trees influence the design of efficient algorithms?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "They play a crucial role by ensuring that data can be accessed, inserted, and deleted in logarithmic time, which is essential for the efficiency of many algorithms.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "Is it worthwhile to implement these advanced structures from scratch, or should I focus more on understanding existing implementations?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "For academic purposes, implementing them from scratch can provide deep insights. However, for production systems, using well-tested libraries is often the better approach.",
          },
        ],
      },
    ],
    [
      {
        title: "Algorithms: Course Orientation",
        main_post:
          "Welcome to CS102 Algorithms! This course will cover essential algorithms including sorting, searching, graph algorithms, and more. Please review the syllabus for detailed topics and important dates. Get ready to enhance your problem-solving skills and algorithmic thinking.",
        type: "announcement",
        user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
        replies: [
          {
            user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
            text: "The orientation session was very informative. I now have a clear idea of the topics we'll cover, like graph algorithms and sorting techniques.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "I appreciate the detailed syllabus. It sets the right expectations for what we will learn in this course.",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Looking forward to the hands-on labs. Understanding algorithms practically will enhance our problem-solving skills.",
          },
          {
            user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
            text: "I’m particularly excited about exploring graph algorithms, which seem challenging but very rewarding.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "Are there any additional resources recommended for beginners to brush up on fundamental algorithms?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Yes, the professor mentioned a couple of online courses and textbooks that provide great supplementary material.",
          },
          {
            user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
            text: "I found the Q&A session during the orientation very helpful. It cleared up many doubts about the exam format.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "Will there be weekly quizzes to reinforce the lecture material throughout the semester?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Yes, weekly quizzes are planned to help reinforce concepts and gauge our understanding.",
          },
          {
            user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
            text: "I'm excited about the project work outlined in the orientation. It promises to be a great way to apply what we learn.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "I wonder if we can form study groups to discuss challenging topics like dynamic programming and recursion.",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Absolutely, forming study groups is encouraged as collaboration can really enhance your understanding of complex algorithms.",
          },
        ],
      },
      {
        title: "Algorithms: Midterm Exam Update",
        main_post:
          "Important update regarding the midterm exam in CS102 Algorithms. Please review the revised exam schedule, topics to focus on, and study resources available. Make sure you’re prepared and reach out if you have any questions.",
        type: "announcement",
        user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
        replies: [
          {
            user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
            text: "The updated exam schedule is very clear. I appreciate knowing exactly when each section of the exam will take place.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "I’m reviewing the topics for the midterm. The focus on dynamic programming is particularly challenging.",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Dynamic programming is key. Make sure to practice various problems to get comfortable with the concepts.",
          },
          {
            user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
            text: "The revised exam format gives us a better understanding of what to expect. I feel more prepared now.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "Are there any sample papers available? It would help to work through some practice exams.",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "The course website has been updated with sample questions and past exam papers. Check those out for practice.",
          },
          {
            user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
            text: "I plan to form a study group to go over graph algorithms and other challenging topics mentioned in the update.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "Time management during the exam is crucial. Any tips on pacing oneself during a long exam?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Practice solving problems within a set time limit. That’s the best way to build speed and accuracy.",
          },
          {
            user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
            text: "The midterm update also mentioned additional office hours. It’s a great chance to clear any lingering doubts.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "I feel more confident about the midterm after this update. The sample questions are very helpful.",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Remember to review all the sample problems and join the study sessions. Consistent practice is key to success in the exam.",
          },
          {
            user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
            text: "The update has definitely eased my concerns about the exam format. I'm looking forward to a fair and comprehensive test of our skills.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "I appreciate the transparency of the exam update. It really helps in planning my study schedule effectively.",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Good luck to everyone! Let’s make sure we all take advantage of the additional resources and office hours provided.",
          },
        ],
      },
      {
        title: "Algorithms: Problem-Solving Techniques",
        main_post:
          "Discuss various problem-solving techniques for tackling algorithm challenges. Share your strategies, coding practices, and tips to optimize your approach to algorithm problems.",
        user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
        type: "discussion",
        replies: [
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "I'm struggling with designing an efficient divide-and-conquer strategy for sorting algorithms. What approaches have you found effective?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Consider using a recursive approach that divides the problem into smaller subproblems and then merges the sorted results; merge sort is a classic example.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "I'm curious about optimizing backtracking algorithms for combinatorial problems. What strategies do you recommend?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Pruning unnecessary branches early is key; also, try ordering the choices to explore the most promising ones first.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "How do you approach optimizing recursive algorithms to reduce their time complexity?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Using memoization to store results of subproblems is very effective in cutting down redundant computations.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "What are your thoughts on using iterative deepening search compared to standard depth-first search in complex problems?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Iterative deepening combines the benefits of depth-first search's low memory usage with the completeness of breadth-first search, which can be very useful.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "Can someone explain the difference between greedy algorithms and dynamic programming for solving optimization problems?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Greedy algorithms make the locally optimal choice at each step, while dynamic programming considers the outcomes of all possible subproblems to achieve a global optimum.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "Are there any specific challenges you face when implementing graph algorithms in real-world scenarios?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Handling large graphs efficiently often requires careful selection of data structures and sometimes approximations when exact solutions are computationally heavy.",
          },
        ],
      },
      {
        title: "Algorithms: Homework Discussion",
        main_post:
          "This thread is dedicated to discussing the latest homework assignment on dynamic programming and graph algorithms. Post your questions, solutions, and discuss different approaches to solving these problems.",
        type: "discussion",
        user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
        replies: [
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "I'm having difficulty understanding the recurrence relation for the dynamic programming problem on sequence alignment. Can someone clarify the logic behind it?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "The recurrence relation compares the cost of aligning characters, inserting, or deleting, and then takes the minimum of those options. It essentially builds the optimal solution by comparing subproblem solutions.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "In our graph algorithms homework, how should we handle negative edge weights? I'm confused about which algorithm is best suited for that.",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "For graphs with negative edge weights, the Bellman-Ford algorithm is recommended as it can handle negative weights and also detect negative cycles.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "I'm struggling with implementing memoization for my recursive solutions. What are some best practices?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Store the results of each recursive call in a dictionary or array, and check if the value is already computed before making the recursive call. This avoids redundant calculations.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "What techniques do you recommend for debugging recursive functions effectively?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "I suggest using a debugger to step through the recursive calls or inserting print statements to log the function's parameters and return values at each step.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "Can someone explain the differences between top-down and bottom-up dynamic programming approaches?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Top-down dynamic programming uses recursion with memoization, whereas bottom-up builds the solution iteratively from the base case. The latter can be more space-efficient.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "How do we ensure that our dynamic programming solutions handle all edge cases effectively?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Thoroughly test your solutions with a variety of input cases, including boundary conditions. Adding assertions can help ensure your code handles edge cases properly.",
          },
        ],
      },
    ],
    [
      {
        title: "Operating Systems: Welcome Message",
        main_post:
          "Welcome to CS103 Operating Systems! In this course, we will explore the core concepts of operating systems including process management, memory management, file systems, and more. Please review the syllabus for detailed course information and key dates.",
        type: "announcement",
        user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
        replies: [
          {
            user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
            text: "I’m excited to dive into process management. The course outline looks promising!",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "The syllabus covers key topics, and I'm particularly interested in file systems.",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Looking forward to the hands-on labs. Understanding operating systems practically will boost our learning.",
          },
          {
            user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
            text: "Can someone confirm if there will be additional lab sessions focusing on process scheduling?",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "I hope we get practical exercises on memory management to complement the theoretical lectures.",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "The key dates mentioned are very helpful. It sets clear expectations for exams and project submissions.",
          },
          {
            user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
            text: "I’m curious if there will be a project where we can build a mini operating system. That would be a challenging yet rewarding experience.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "Understanding file systems is critical; I'm eager to learn more about how they manage storage.",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "The course structure is well laid out, balancing theory and practical labs effectively.",
          },
          {
            user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
            text: "Will the course include guest lectures from industry professionals? That could add valuable insights.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "I'm looking forward to exploring the intricacies of memory management, especially how modern OS handle virtualization.",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Overall, the welcome message sets a positive tone for the course. I'm ready for a challenging and engaging semester!",
          },
        ],
      },
      {
        title: "Operating Systems: Lab Schedule Update",
        main_post:
          "Please note the updated lab schedule for CS103. The timings for various lab sessions have been revised. Check the updated timetable to ensure you attend the correct sessions and experiments.",
        type: "announcement",
        user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
        replies: [
          {
            user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
            text: "Thanks for the update. I’ve adjusted my calendar to reflect the new lab timings.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "The revised lab schedule works better with my class timings. Appreciate the clear communication!",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "I noticed the lab sessions have been rescheduled to avoid conflicts with lectures. This should help us manage our time more efficiently.",
          },
          {
            user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
            text: "Will there be extra lab sessions for those who miss their slot due to unavoidable conflicts?",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "The update indicates changes in experiment timings for memory management. I’m eager to see the new lab exercises.",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Can anyone confirm if the lab sessions will now be held in the new computer lab building?",
          },
          {
            user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
            text: "The revised timetable is very detailed. It’s going to help reduce confusion about which lab session to attend.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "I'm planning to attend the new lab sessions to get hands-on experience with file system operations.",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "The updated schedule gives us more time between lab sessions, which should help in thorough understanding of the experiments.",
          },
          {
            user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
            text: "I appreciate the timely update on the lab schedule. It allows us to better plan our study sessions around labs.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "The new lab timings are more convenient. I’m looking forward to the improved lab sessions on process management.",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "This update is very useful. I’ll be sure to double-check the timetable and adjust my weekly plan accordingly.",
          },
          {
            user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
            text: "The revised lab schedule should help us avoid overlaps with lectures. Thanks for the clear instructions!",
          },
        ],
      },
      {
        title: "Operating Systems: Homework Q&A",
        main_post:
          "This discussion thread is dedicated to addressing questions regarding the latest homework assignment on process synchronization and scheduling. Share your queries and help each other understand the concepts better.",
        type: "discussion",
        user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
        replies: [
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "I'm having trouble understanding the proper use of semaphores in process synchronization. Can someone explain how they help prevent race conditions?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Semaphores are used to control access to shared resources by multiple processes. They signal when a resource is available and help prevent race conditions by ensuring that only one process accesses the critical section at a time.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "What is the difference between binary semaphores and counting semaphores?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Binary semaphores only take values 0 and 1 and are used for mutual exclusion, while counting semaphores can have a range of values, allowing them to manage a specified number of identical resources.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "I'm confused about how process scheduling algorithms work with priorities. Could someone clarify their role in synchronization?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Priority scheduling assigns different priorities to processes, ensuring that higher-priority processes are executed first. This helps manage CPU allocation and can reduce wait times, especially when combined with proper synchronization mechanisms.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "How can we avoid deadlocks when multiple processes compete for resources?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Deadlocks can be avoided by employing strategies like resource ordering, avoiding hold-and-wait conditions, and using timeout mechanisms to release resources if processes wait too long.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "In our assignment, should we use mutexes or semaphores for synchronization? Which is more appropriate?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Mutexes are essentially binary semaphores designed specifically for mutual exclusion. They are often simpler to use when you just need to protect a critical section.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "I encountered a segmentation fault while working on my synchronization code. What common pitfalls should I check for?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Segmentation faults in synchronization often occur due to improper handling of pointers or accessing freed memory. Ensure you check all pointer references and follow the correct order of locking and unlocking resources.",
          },
        ],
      },
      {
        title: "Operating Systems: System Concepts Discussion",
        main_post:
          "Discuss key concepts in Operating Systems such as deadlock, virtual memory, and inter-process communication. Share your insights, ask questions, and explore these topics in depth.",
        type: "discussion",
        user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
        replies: [
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "Can someone explain what virtual memory is and how it benefits an operating system?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Virtual memory allows an operating system to use disk space to extend the available RAM, enabling efficient multitasking and process isolation even when physical memory is limited.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "How do inter-process communication methods like pipes and shared memory differ?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Pipes provide a unidirectional communication channel between processes, while shared memory allows multiple processes to access the same memory region for faster data exchange.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "What exactly causes a deadlock, and how can it be detected?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Deadlock occurs when a set of processes are each waiting for resources held by others, creating a cycle of dependencies. It can be detected using resource allocation graphs or deadlock detection algorithms.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "Is there a clear difference between deadlock and starvation in operating systems?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Yes, deadlock is a state where processes are stuck waiting for each other, whereas starvation happens when a process is perpetually denied necessary resources, even though the system as a whole is not deadlocked.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "How do scheduling algorithms play a role in preventing deadlocks?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Effective scheduling can help reduce the risk of deadlock by ensuring that resources are allocated efficiently and that no process holds resources indefinitely.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "Can modern operating systems automatically recover from deadlocks?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Some systems implement deadlock detection and recovery mechanisms, but prevention is generally the preferred approach since recovery can be complex and may result in data loss.",
          },
        ],
      },
      {
        title: "Operating Systems: Assignment 1",
        main_post:
          "Assignment 1 requires you to implement basic process scheduling algorithms. Submit your code and a brief explanation of your scheduling strategy as per the guidelines.",
        type: "assignment",
        user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
        due_date: "2025-03-23 23:59:59",
        total_marks: 100,
      },
      {
        title: "Operating Systems: Assignment 2",
        main_post:
          "Assignment 2 focuses on memory management and file system design. Ensure that your submission includes both the implementation and a report on your approach and results.",
        type: "assignment",
        user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
        due_date: "2025-03-03 23:59:59",
        total_marks: 100,
      },
    ],
    [
      {
        title: "Computer Networks: Course Introduction",
        main_post:
          "Welcome to CS104 Computer Networks! This course covers network fundamentals, protocols, and security. Please refer to the syllabus for detailed topics and important dates, and get ready to dive into the world of computer networking.",
        type: "announcement",
        user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
        replies: [
          {
            user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
            text: "I'm excited about the comprehensive syllabus that covers both network protocols and security fundamentals.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "The course seems very practical; I'm looking forward to hands-on labs and network configuration exercises.",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Will there be any guest lectures from industry experts to provide real-world insights into computer networking?",
          },
          {
            user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
            text: "The introduction is very clear. I appreciate the detailed breakdown of key topics like TCP/IP, routing, and network security.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "Is there a recommended reading list or additional resources provided for deeper understanding?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "I hope the labs include simulations using tools like Wireshark and Cisco Packet Tracer for practical learning.",
          },
          {
            user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
            text: "The syllabus is well-structured, balancing theoretical lectures with practical sessions, which is crucial for this subject.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "I'm particularly interested in exploring the latest advancements in network security during this course.",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Looking forward to seeing real-world network setups and learning effective troubleshooting techniques.",
          },
          {
            user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
            text: "Can someone share tips on how best to prepare for the practical labs in this course?",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "I plan to form a study group with classmates to discuss and review the challenging topics covered in the lectures.",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "The course introduction sets a great foundation. I'm ready for an engaging semester in computer networking.",
          },
        ],
      },
      {
        title: "Computer Networks: Exam Schedule Update",
        main_post:
          "Important update: The exam schedule for CS104 has been revised. Please review the new dates and plan your study schedule accordingly. Contact the department if you have any scheduling conflicts.",
        type: "announcement",
        user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
        replies: [
          {
            user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
            text: "The revised exam schedule is very clear and will help me plan my revision sessions more efficiently.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "I appreciate the update. Knowing the exact exam dates for network protocols and security will reduce a lot of uncertainty.",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Will the updated schedule allow enough time for covering the complex topics, such as routing algorithms and network security?",
          },
          {
            user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
            text: "I noticed the new timetable avoids overlapping exam sessions, which is a huge relief.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "Are there any changes to the exam format, or is it just a rescheduling of dates?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "The update mentions additional review sessions before the exams. This will be very helpful for final preparations.",
          },
          {
            user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
            text: "I plan to join the extra office hours provided to clarify any doubts on network protocols before the exam.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "The clear schedule allows for better time management. I’m adjusting my study plan accordingly.",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "I hope the revised schedule also includes details on the practical exam components.",
          },
          {
            user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
            text: "Does anyone know if the exam venues have been changed as well, or is it just the dates?",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "I appreciate the department’s effort in communicating these changes early so that we can plan our revision schedules accordingly.",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "The updated exam schedule is a significant improvement. It gives us a clear timeline to focus our studies on network fundamentals and security.",
          },
        ],
      },
      {
        title: "Computer Networks: Discussion on TCP/IP",
        main_post:
          "Discuss the core concepts of TCP/IP protocols and their impact on network performance. Share your insights, questions, and real-world examples related to networking.",
        type: "discussion",
        user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
        replies: [
          {
            user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
            text: "I'm trying to understand how the TCP three-way handshake establishes a connection. Can someone break down the steps?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Sure, the process starts with a SYN from the client, then the server responds with a SYN-ACK, and finally the client sends an ACK, completing the handshake.",
          },
          {
            user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
            text: "What are the main differences between TCP and UDP in terms of reliability and speed?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "TCP is connection-oriented and provides reliability through acknowledgments and retransmissions, whereas UDP is connectionless and faster but doesn’t guarantee delivery.",
          },
          {
            user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
            text: "I’m curious about how TCP manages congestion control. What algorithms are typically used?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "TCP uses algorithms like slow start, congestion avoidance, and fast recovery to manage congestion and optimize throughput.",
          },
          {
            user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
            text: "How does the sliding window mechanism in TCP improve data transmission efficiency?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "The sliding window allows multiple packets to be sent before requiring an acknowledgment, which maximizes the use of available bandwidth and minimizes idle time.",
          },
          {
            user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
            text: "Does anyone have real-world examples where TCP/IP performance issues were resolved by tweaking these parameters?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "In many cases, adjusting the window size and timeout intervals in high-latency networks can significantly improve performance.",
          },
          {
            user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
            text: "I wonder how new protocols like QUIC compare to traditional TCP in terms of performance.",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "QUIC is designed to reduce latency by combining transport and security protocols, offering faster connection establishment compared to TCP.",
          },
        ],
      },
      {
        title: "Computer Networks: Homework and Lab Discussion",
        main_post:
          "This thread is for discussing the latest homework and lab assignments related to routing protocols and network security. Post your questions, solutions, and insights to help each other out.",
        type: "discussion",
        user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
        replies: [
          {
            user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
            text: "I'm having trouble understanding the difference between distance vector and link-state routing. Can anyone explain the main concepts clearly?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Distance vector routing relies on neighboring routers sharing information, while link-state routing involves each router building a complete map of the network before calculating the shortest path.",
          },
          {
            user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
            text: "In the lab assignment, how do we simulate network traffic effectively to test our routing protocols?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Using network simulation tools like GNS3 or Packet Tracer can help you model and simulate traffic, enabling you to analyze the performance of your routing protocols.",
          },
          {
            user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
            text: "I also had a question about configuring OSPF in the lab. Any tips for setting up the areas correctly?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Make sure you define a backbone area (Area 0) and properly configure the other areas to connect to it. Check your router IDs and network statements carefully.",
          },
          {
            user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
            text: "What’s the best way to verify that our routing tables are updated correctly in the simulation?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Use commands like 'show ip route' to check the routing table and 'ping' or 'traceroute' to test connectivity between nodes.",
          },
          {
            user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
            text: "I'm considering writing a report along with my lab submission. What key points should I include to make it comprehensive?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Include your network topology, the configuration steps for your routers, a summary of the commands used, and an analysis of the performance of your routing protocol under different conditions.",
          },
          {
            user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
            text: "Do we have to implement both static and dynamic routing protocols in the lab assignment, or just one of them?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "The lab focuses on dynamic routing protocols, so you should concentrate on configuring protocols like OSPF and RIP rather than static routing.",
          },
        ],
      },
    ],
    [
      {
        title: "DBMS: Course Kick-off",
        main_post:
          "Welcome to CS105 Database Management Systems! This course will cover SQL, normalization, transaction management, and more. Please review the course outline and key dates. Get ready to build a strong foundation in database technologies.",
        type: "announcement",
        user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
        replies: [
          {
            user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
            text: "The course introduction is very clear. I appreciate the focus on SQL and normalization.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "I'm excited to learn about transaction management. Understanding ACID properties is crucial.",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Does anyone have recommendations for additional resources on database design and SQL optimization?",
          },
          {
            user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
            text: "I suggest checking out online tutorials on SQL and the book 'Database System Concepts' for more in-depth learning.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "The syllabus looks comprehensive. I'm particularly interested in how we will handle complex queries in our labs.",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Hands-on projects will definitely enhance our understanding. I'm looking forward to the practical assignments.",
          },
          {
            user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
            text: "I hope we get lab sessions that focus on real-world database scenarios to apply the theoretical concepts.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "I'm also interested in how normalization impacts query performance and data integrity.",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Overall, this course kick-off has set a strong foundation for learning DBMS. Excited for the semester ahead!",
          },
          {
            user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
            text: "The key dates are well highlighted. I'll make sure to keep track of all assignment and exam deadlines.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "I'm looking forward to the project work, especially applying normalization techniques to real datasets.",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "This introduction really motivates me to dive deep into database technologies. Let's have a great semester!",
          },
        ],
      },
      {
        title: "DBMS: Mid-Semester Announcement",
        main_post:
          "Mid-semester update: Important changes have been made to the project guidelines and exam dates for CS105. Please review these updates carefully and adjust your study and project plans accordingly.",
        type: "announcement",
        user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
        replies: [
          {
            user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
            text: "The mid-semester update is very timely. I've noted the changes in project guidelines and adjusted my timeline.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "The revised exam dates are much better than before. It's easier to plan my revision schedule now.",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "I appreciate the detailed explanation of the new project guidelines. This will help us align our work with the course expectations.",
          },
          {
            user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
            text: "Does anyone have questions about the updated exam schedule? I'm trying to coordinate my study sessions around these new dates.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "The update mentioned additional resources for exam preparation. Has anyone accessed the new materials yet?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Yes, the supplementary materials on advanced SQL and transaction management are now available on the course website.",
          },
          {
            user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
            text: "I plan to adjust my project proposal based on these new guidelines. The clarified deliverables are very helpful.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "The revised exam schedule will allow for a more balanced workload. I'm feeling more confident about the upcoming tests.",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "I appreciate the transparency of the update. It gives a clear picture of what's expected for both the project and the exams.",
          },
          {
            user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
            text: "Will there be a Q&A session to address any further questions about these changes? It would be great to have more interaction.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "I'm planning to join the additional office hours to clarify some doubts regarding the updated guidelines.",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Overall, the mid-semester update is comprehensive and will definitely help us manage our workload better. Let's all take advantage of the new resources and planning opportunities.",
          },
        ],
      },
      {
        title: "DBMS: Homework Discussion",
        main_post:
          "Discuss your challenges and solutions related to the latest homework on SQL queries and normalization techniques. Share insights and help each other understand the concepts better.",
        type: "discussion",
        user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
        replies: [
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "I'm having trouble with writing efficient SQL queries for multi-table joins. Any tips?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Try using INNER JOIN and ensure you have proper indexes on the foreign keys to optimize performance.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "How do we decide the best normal form for our database design? My schema seems normalized, but redundancy still exists.",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Check if your tables follow BCNF. If redundancy persists, consider breaking down further while ensuring functional dependencies remain consistent.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "I'm confused about when to use GROUP BY vs. PARTITION BY in queries. Any clarification?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "GROUP BY aggregates data into single-row results, while PARTITION BY keeps individual rows but provides windowed calculations. Use GROUP BY when you need summarized data.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "Thanks! That makes a lot more sense now.",
          },
        ],
      },
      {
        title: "DBMS: Project Ideas Exchange",
        main_post:
          "This discussion thread is for sharing and brainstorming project ideas for CS105. Collaborate with peers, get feedback on your proposals, and explore innovative approaches to database management.",
        type: "discussion",
        user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
        replies: [
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "I'm considering a project on a student attendance management system using SQL and triggers. Would love some feedback!",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "That sounds like a great idea! You could implement automatic attendance tracking using timestamps and stored procedures.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "I'm thinking of building an inventory management system with real-time stock tracking. Would NoSQL be a better fit?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "For structured data with transactions, SQL is better. If you need scalability with unstructured data, NoSQL might work well.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "What about a library management system with book recommendations based on borrowing history?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Great idea! You can implement a recommendation system using SQL queries to analyze borrowing trends.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "Thanks! I'll start drafting an ER diagram for it.",
          },
        ],
      },
    ],
    [
      {
        title: "Software Engineering: Course Introduction",
        main_post:
          "Welcome to CS201 Software Engineering! This course covers the software development lifecycle, methodologies, project management, and quality assurance. Please review the syllabus and project guidelines carefully to understand the course expectations.",
        type: "announcement",
        user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
        replies: [
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "Excited to start this course! Which software development methodology will we be focusing on the most?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "We will cover multiple methodologies, but Agile and Waterfall will be the primary focus, with hands-on experience in Agile practices.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "Will there be group projects or individual assignments?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Both! There will be individual coding assignments as well as a team-based software development project.",
          },
        ],
      },
      {
        title: "Software Engineering: Project Kick-Off",
        main_post:
          "The project phase for CS201 has officially begun. Form your teams, review the project requirements, and start planning your software development process. This is your opportunity to apply best practices in a real-world scenario.",
        type: "announcement",
        user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
        replies: [
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "How should we go about selecting a project topic? Any recommendations?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Choose a problem that aligns with your interests and skill level. Consider real-world applications, and make sure it has enough scope to demonstrate software engineering principles.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "What documentation will be required throughout the project?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "You'll need a project proposal, requirements specification, design document, progress reports, and final documentation. Follow the course guidelines for detailed expectations.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "Are we required to follow a specific development model for our project?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "You are encouraged to use Agile methodologies, but you can choose a model that best fits your project requirements. Be prepared to justify your choice.",
          },
        ],
      },
      {
        title: "Software Engineering: Agile Practices Discussion",
        main_post:
          "Discuss your experiences and challenges with implementing Agile methodologies in software projects. Share tips, tools, and best practices for effective Agile development.",
        type: "discussion",
        user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
        replies: [
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "One challenge I faced with Agile was managing changing requirements. How do teams handle frequent scope changes while maintaining productivity?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Great question! Frequent scope changes should be managed through a well-maintained product backlog and clear prioritization in sprint planning. Encourage close collaboration between developers and stakeholders.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "Are there any recommended tools to track sprint progress and team performance in Agile?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Yes, some popular Agile tools include Jira, Trello, Asana, and Azure DevOps. These tools help with backlog management, sprint planning, and tracking team velocity.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "How can we ensure effective daily stand-up meetings in Agile teams?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Keep stand-ups short (10-15 minutes), focus on three key questions: What was done yesterday? What’s planned for today? Any blockers? Encourage transparency and avoid problem-solving during stand-ups.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "Scrum vs Kanban: Which one is better for small development teams?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "It depends on your project needs! Scrum works well for structured sprints, while Kanban is great for continuous workflows with flexible priorities.",
          },
        ],
      },
      {
        title: "Software Engineering: Code Review Best Practices",
        main_post:
          "Engage in a discussion about effective code review practices. Share your insights on maintaining code quality, using automated tools, and fostering a culture of continuous improvement.",
        type: "discussion",
        user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
        replies: [
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "What are some common mistakes to avoid during code reviews?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Some common mistakes include focusing on personal preferences rather than best practices, not providing actionable feedback, and neglecting security concerns. Always keep reviews constructive and focused on improvement.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "Are there any recommended tools for automating parts of the code review process?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Yes! Tools like SonarQube, ESLint, and GitHub Actions can help automate style checks, security analysis, and test coverage evaluation during code reviews.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "How can we make sure code reviews don’t slow down the development process?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Set time limits for reviews, use automated checks for minor issues, and establish clear review guidelines to streamline the process.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "How important is pair programming in code reviews?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Pair programming can be very beneficial! It helps catch issues early, improves collaboration, and enhances code quality before the formal review process.",
          },
        ],
      },
    ],
    [
      {
        title: "Artificial Intelligence: Course Welcome",
        main_post:
          "Welcome to CS301 Artificial Intelligence! This course introduces fundamental AI concepts including search algorithms, knowledge representation, and reasoning. Please review the syllabus for detailed course content and important dates.",
        type: "announcement",
        user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
        replies: [
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "Excited to start this course! What are some recommended books or online resources to supplement the syllabus?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Great enthusiasm! 'Artificial Intelligence: A Modern Approach' by Russell & Norvig is a classic. Online courses like those on Coursera and MIT OpenCourseWare are also great supplements.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "Will there be hands-on coding assignments using AI libraries like TensorFlow or PyTorch?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Yes! The course includes practical assignments where you'll implement AI models using Python and libraries like TensorFlow, PyTorch, and scikit-learn.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "Is prior experience with machine learning required, or will the course start from the basics?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "No prior experience is required! We'll start with fundamental AI concepts and gradually move towards more advanced topics.",
          },
        ],
      },
      {
        title: "Artificial Intelligence: Seminar Announcement",
        main_post:
          "Join us for an exciting AI seminar featuring leading experts discussing neural networks, reinforcement learning, and ethical AI practices. Mark your calendars and check the event details for more information.",
        type: "announcement",
        user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
        replies: [
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "This sounds interesting! Will the seminar be recorded for those who can't attend live?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Yes! A recording will be made available after the event for those who miss it.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "Who are the guest speakers for this seminar?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "We have experts from both academia and industry, including AI researchers and engineers from top tech companies. More details will be shared soon!",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "Will there be an opportunity for Q&A with the speakers?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Yes! The seminar will include a live Q&A session where attendees can ask questions directly to the speakers.",
          },
        ],
      },
      {
        title: "Artificial Intelligence: AI Ethics Debate",
        main_post:
          "Engage in a discussion about the ethical implications of AI. Share your perspectives on bias, accountability, and how AI can impact society.",
        type: "discussion",
        user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
        replies: [
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "One major concern with AI ethics is bias in training data. If AI is trained on biased datasets, it can lead to unfair outcomes in decision-making.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "Agreed! We’ve already seen examples where AI models reflect societal biases, like biased hiring algorithms. How can we mitigate this?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "One solution is increasing transparency in AI models. Explainable AI (XAI) can help identify and correct biases in decision-making.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "Regulations also play a key role. Governments and organizations should implement ethical guidelines for AI development.",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "But regulations can slow down innovation. Do you think strict AI laws could hinder technological progress?",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "That’s a valid point. Maybe a balanced approach is needed—enforcing ethical standards while allowing innovation to thrive.",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "What about AI in surveillance? Some argue it's necessary for security, while others say it violates privacy.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "AI surveillance can be misused, but it also helps in crime prevention. The challenge is ensuring it’s not abused.",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Perhaps ethical AI should include strict guidelines on user consent and transparency in surveillance technologies.",
          },
        ],
      },
      {
        title: "Artificial Intelligence: Project Ideas Discussion",
        main_post:
          "Discuss potential project ideas for applying AI in real-world scenarios. Share your concepts, challenges, and insights to help refine and improve your proposals.",
        type: "discussion",
        user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
        replies: [
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "How about an AI-powered chatbot for mental health support? It could provide basic guidance and resources for users.",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "That’s a great idea! But ensuring ethical AI practices, like user privacy and proper disclaimers, would be essential.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "Another idea could be an AI-driven resume analyzer to help job seekers optimize their resumes for applicant tracking systems.",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Interesting! It could use NLP to scan resumes and suggest improvements based on job descriptions.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "What about an AI-powered plant disease detection app? Farmers could upload photos of crops, and the AI would diagnose issues.",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "This could be really useful in agriculture! You could train a model using images of healthy and diseased crops.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "Would an AI-driven real-time traffic congestion predictor be feasible? It could help optimize routes based on live traffic data.",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Yes! You’d need real-time data from traffic sensors and historical traffic patterns to make accurate predictions.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "I’m also thinking about an AI-powered personal finance assistant that suggests budgeting strategies based on spending habits.",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "That’s a useful idea! It could use machine learning to categorize expenses and provide insights on saving strategies.",
          },
        ],
      },
    ],
    [
      {
        title: "Machine Learning: Course Orientation",
        main_post:
          "Welcome to CS401 Machine Learning! This course covers various machine learning techniques including supervised, unsupervised, and reinforcement learning. Please review the syllabus for key topics, lab schedules, and assignment deadlines.",
        type: "announcement",
        user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
        replies: [
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "Excited to start this course! Which programming languages will we primarily use for the assignments?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Mostly Python, using libraries like scikit-learn, TensorFlow, and PyTorch.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "Great! Do we need any prerequisites, like knowledge of statistics or linear algebra?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "A basic understanding of linear algebra and probability will be helpful, but we’ll cover the essential concepts in the course.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "Will we be working on real-world datasets? I’d love to apply machine learning to real problems.",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Yes! The course includes hands-on projects with real datasets from domains like healthcare, finance, and image recognition.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "That sounds exciting! Looking forward to learning about neural networks and deep learning.",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Deep learning will be covered later in the course. We'll start with traditional machine learning techniques first.",
          },
        ],
      },
      {
        title: "Machine Learning: Lab Schedule Announcement",
        main_post:
          "Attention: The lab schedule for CS401 has been updated. Please check the new timings and ensure you attend your assigned lab sessions for hands-on practice with machine learning models.",
        type: "announcement",
        user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
        replies: [
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "Where can we find the updated lab schedule? Is it posted on the course portal?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Yes, the new schedule is available on the course portal under the ‘Lab Sessions’ section.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "Will the labs cover practical implementations of different ML algorithms?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Absolutely! Each lab will focus on implementing different ML techniques, including regression, classification, and clustering.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "Is there any required software setup for the labs? Should we install anything beforehand?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "You’ll need Python, Jupyter Notebook, and libraries like NumPy, Pandas, and TensorFlow. We’ll provide a setup guide.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "Sounds good! Will lab attendance be mandatory, or can we complete the exercises independently?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Lab attendance is strongly recommended, but exercises can be completed independently if necessary.",
          },
        ],
      },
      {
        title: "Machine Learning: Model Optimization Strategies",
        main_post:
          "Discuss various strategies for optimizing machine learning models. Share your experiences with hyperparameter tuning, regularization, and model selection techniques to improve performance.",
        type: "discussion",
        user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
        replies: [
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Hyperparameter tuning is crucial. Have you tried using Grid Search or Random Search for optimizing parameters?",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "Yes! But I recently started using Bayesian Optimization and it’s been much more efficient than Grid Search.",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "That’s great! Bayesian Optimization can significantly reduce search time. Have you also experimented with genetic algorithms for hyperparameter tuning?",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "Not yet, but I’ve heard good things about it. Do you have any recommended libraries for implementing it?",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "You can try DEAP (Distributed Evolutionary Algorithms in Python) for implementing genetic algorithms in hyperparameter tuning.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "Regularization is another key factor. L1 (Lasso) and L2 (Ridge) regularization have helped me reduce overfitting in my models.",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "True! L1 is great for feature selection as it tends to shrink some weights to zero, while L2 helps in controlling large coefficients.",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "How do you usually choose between different models? I find cross-validation to be a useful strategy.",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Yes, k-fold cross-validation is very effective. I also compare models using evaluation metrics like AUC-ROC, precision-recall, and F1-score.",
          },
        ],
      },
      {
        title: "Machine Learning: Data Preprocessing Techniques",
        main_post:
          "Discuss best practices for data preprocessing in machine learning projects. Share tips on handling missing data, feature scaling, normalization, and other preprocessing steps.",
        type: "discussion",
        user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
        replies: [
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Handling missing data is tricky. Do you prefer imputation techniques like mean/mode replacement, or dropping missing values?",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "It depends on the dataset. If the missing data is minimal, I usually impute. If a feature has too many missing values, I drop it.",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "That makes sense. For categorical features, do you use one-hot encoding or label encoding?",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "One-hot encoding works well for nominal categories, while label encoding is better for ordinal categories.",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Have you tried feature scaling techniques like MinMaxScaler or StandardScaler?",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "Yes! MinMaxScaler is good for data between fixed ranges, while StandardScaler works best when the data is normally distributed.",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "Feature engineering is also important. Have you used polynomial features or interaction terms in your models?",
          },
          {
            user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
            text: "Yes, generating polynomial features has improved my regression models significantly. But it can also lead to overfitting.",
          },
          {
            user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
            text: "That’s true. Regularization techniques like Ridge regression can help control overfitting when using polynomial features.",
          },
        ],
      },
    ],
  ],

  // Classroom assignments
  classroomAssignments: [
    [
      {
        title: "Data Structures: Assignment 1",
        main_post:
          "Assignment 1 covers basic data structures including arrays and linked lists. Complete the exercises provided and submit your code along with a brief explanation of your approach by the deadline.",
        user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
        due_date: "2025-03-23 23:59:59",
        total_marks: 100,
      },
      {
        title: "Data Structures: Assignment 2",
        main_post:
          "Assignment 2 focuses on stacks, queues, and tree implementations. Follow the guidelines provided, and ensure your submission includes both code and a short report discussing the performance of your data structures.",
        user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
        due_date: "2025-03-03 23:59:59",
        total_marks: 100,
      },
    ],
    [
      {
        title: "Algorithms: Assignment 1",
        main_post:
          "Assignment 1 focuses on implementing and analyzing basic sorting and searching algorithms. Submit your optimized code along with performance analysis by the deadline.",
        user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
        due_date: "2025-03-23 23:59:59",
        total_marks: 100,
      },
      {
        title: "Algorithms: Assignment 2",
        main_post:
          "Assignment 2 covers dynamic programming and greedy algorithms. Ensure that your submission includes well-documented code and a report discussing the time complexity and efficiency of your solutions.",
        user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
        due_date: "2025-03-03 23:59:59",
        total_marks: 100,
      },
    ],
    [
      {
        title: "Computer Networks: Assignment 1",
        main_post:
          "Assignment 1 focuses on network topology design and simulation. Follow the guidelines to create a detailed network model and submit your simulation results.",
        user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
        due_date: "2025-03-23 23:59:59",
        total_marks: 100,
      },
      {
        title: "Computer Networks: Assignment 2",
        main_post:
          "Assignment 2 requires an analysis of network security protocols. Submit a comprehensive report discussing the strengths and weaknesses of the protocols covered.",
        user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
        due_date: "2025-03-03 23:59:59",
        total_marks: 100,
      },
    ],
    [
      {
        title: "DBMS: Assignment 1",
        main_post:
          "Assignment 1 involves creating a relational database for a sample business scenario. Follow normalization rules and design efficient queries as per the assignment guidelines.",
        user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
        due_date: "2025-03-23 23:59:59",
        total_marks: 100,
      },
      {
        title: "DBMS: Assignment 2",
        main_post:
          "Assignment 2 focuses on transaction management and concurrency control. Submit a project that demonstrates your understanding of these concepts along with a detailed report.",
        user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
        due_date: "2025-03-03 23:59:59",
        total_marks: 100,
      },
    ],
    [
      {
        title: "Software Engineering: Assignment 1",
        main_post:
          "Assignment 1: Develop a small-scale application using Agile development methods. Document your development process, including planning, coding, testing, and iteration.",
        user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
        due_date: "2025-03-23 23:59:59",
        total_marks: 100,
      },
      {
        title: "Software Engineering: Assignment 2",
        main_post:
          "Assignment 2: Create a comprehensive test plan for your project and perform unit testing. Submit your code, test cases, and a report detailing your testing strategy.",
        user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
        due_date: "2025-03-03 23:59:59",
        total_marks: 100,
      },
    ],
    [
      {
        title: "Artificial Intelligence: Assignment 1",
        main_post:
          "Assignment 1: Implement a basic AI search algorithm (such as A* or BFS) to solve a practical problem. Document your approach, code, and results.",
        user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
        due_date: "2025-03-23 23:59:59",
        total_marks: 100,
      },
      {
        title: "Artificial Intelligence: Assignment 2",
        main_post:
          "Assignment 2: Develop a simple neural network model using a framework of your choice. Submit your code along with a report on the model’s performance and potential improvements.",
        user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
        due_date: "2025-03-03 23:59:59",
        total_marks: 100,
      },
    ],
    [
      {
        title: "Machine Learning: Assignment 1",
        main_post:
          "Assignment 1: Build a regression model to predict a continuous variable using provided datasets. Submit your code along with a detailed analysis of your model's performance.",
        user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
        due_date: "2025-03-23 23:59:59",
        total_marks: 100,
      },
      {
        title: "Machine Learning: Assignment 2",
        main_post:
          "Assignment 2: Develop a classification model for a given dataset. Include comprehensive data preprocessing, model training, and evaluation metrics in your submission.",
        user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
        due_date: "2025-03-03 23:59:59",
        total_marks: 100,
      },
    ],
  ],

  // Main forums data with threads and posts
  forums: [
    {
      title: "CS Technology & Innovation",
      group: "department",
      type: "discussion",
      threads: [
        {
          title: "Latest Research Trends in CS",
          main_post:
            "Latest Research Trends in CS: In this thread, we discuss the cutting-edge research trends that are shaping the future of computer science. Topics include deep learning innovations, quantum computing breakthroughs, advances in cybersecurity, novel applications of blockchain, and more. Share your insights, opinions, and discoveries on emerging technologies and interdisciplinary research that push the boundaries of CS.",
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          replies: [
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I'm excited about the advances in deep learning architectures, especially transformers that have revolutionized NLP.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Quantum computing research is making significant strides, with new algorithms that could transform data processing.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Blockchain integration with cybersecurity is an emerging trend that promises enhanced data integrity.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Graph neural networks are showing great potential in analyzing complex relational data.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Edge computing coupled with AI is revolutionizing real-time data processing and decision-making.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Federated learning is gaining traction as a privacy-preserving approach to distributed model training.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I'm impressed by the progress in explainable AI—transparency in model decisions is critical.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Reinforcement learning continues to evolve, with new applications in robotics and autonomous systems.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Self-supervised learning is reducing our reliance on large labeled datasets, which is very promising.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The fusion of symbolic reasoning with neural networks is creating hybrid models that are very intriguing.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Transfer learning remains a powerful technique for adapting models across domains.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Meta-learning is emerging as an exciting field focused on teaching models how to learn efficiently.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Neuromorphic computing is inspiring new hardware architectures that mimic the human brain.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Attention mechanisms have transformed NLP and are now being applied in other domains too.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Interdisciplinary research merging CS with biology is solving some very complex problems.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Multi-modal learning is opening up new possibilities by integrating text, image, and audio data.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Cloud-native architectures are pushing the envelope for scalable, distributed systems.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Ethical AI and bias mitigation are becoming central topics as models impact critical decisions.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Robustness against adversarial attacks is a growing concern in deep learning research.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Generative models, such as GANs, are finding innovative applications in creative industries.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I'm excited about the advancements in reinforcement learning for complex decision-making tasks.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Graph embeddings are enabling more effective analysis of social and biological networks.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Synthetic data generation is becoming a useful tool for training models in data-scarce scenarios.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Interpretable machine learning is key to building trust in complex AI systems.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Neural architecture search is automating the design of optimal deep learning models.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Sparse and quantized networks are critical for deploying models on mobile devices.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Adversarial training is essential to improve the security and reliability of models.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Deep learning is increasingly applied in healthcare for diagnostic purposes.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Data-centric AI is emphasizing the importance of high-quality, curated datasets.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Multi-agent systems in reinforcement learning are tackling coordination problems.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Explainable AI frameworks are being integrated into more commercial applications.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Hybrid models that combine rule-based and statistical methods are gaining interest.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Scalable distributed systems remain a challenge as datasets continue to grow.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Hardware accelerators like GPUs and TPUs are crucial for training large models faster.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Privacy-preserving techniques, like federated learning, are important in today's data landscape.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Integrating computer vision with NLP is yielding fascinating multi-modal models.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Addressing bias in AI systems is a priority for creating fair technology.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Quantum machine learning is an exciting field with potential to revolutionize computation.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Efficient algorithms for big data processing are evolving to meet modern demands.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Collaborative research combining CS and climate science is an interdisciplinary breakthrough.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Self-supervised learning techniques are showing promise in reducing labeling costs.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Zero-shot and few-shot learning methods are pushing the boundaries of AI performance.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Model compression and pruning are key for deploying AI on resource-limited devices.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Automated machine learning (AutoML) is streamlining the model selection process.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Interdisciplinary research, such as AI in healthcare, is creating exciting new applications.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Transfer learning is still one of the most effective ways to leverage pre-trained models.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Meta-learning is an emerging area that teaches models to adapt quickly to new tasks.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I’m excited about neuromorphic computing as it mimics the brain's architecture for efficient processing.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Attention-based models are now extending beyond NLP into image and video analysis.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Emerging research in adversarial robustness is crucial for creating secure AI applications.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Collaborative filtering techniques are continuously being refined for more accurate recommendations.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Interpretable AI is essential for understanding decision-making processes in complex models.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I’m fascinated by the recent developments in graph convolutional networks for network data.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Emerging trends in multimodal learning are enabling the integration of diverse data types.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Research into model interpretability is paving the way for more transparent AI systems.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I'm excited about the potential of hybrid models that combine symbolic and statistical methods.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The future of AI looks bright with ongoing advances in scalable, distributed computing frameworks.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Innovative hardware like AI-specific chips are enabling faster and more efficient model training.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I'm interested in seeing how automated reasoning will evolve in the context of AI.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The integration of AI with augmented reality is creating immersive, interactive experiences.",
            },
          ],
        },
        {
          title: "Research Project Ideas in CS",
          main_post:
            "This thread is dedicated to sharing innovative research project ideas in the field of computer science. Share your ideas for projects ranging from AI applications, cybersecurity, distributed systems, quantum computing, data science, to interdisciplinary research. Let's collaborate and brainstorm to drive innovation in our research endeavors.",
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          replies: [
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Develop a deep learning model for medical image segmentation.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Design an AI system to predict stock market trends.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Implement a secure blockchain protocol for academic records.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Research efficient algorithms for large-scale data processing.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Explore reinforcement learning for autonomous robotics.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Investigate quantum algorithms for solving NP-hard problems.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Develop a privacy-preserving federated learning system.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Study adversarial attacks on neural networks and develop defenses.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Create a multi-modal sentiment analysis system combining text and images.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Design a recommendation engine using collaborative filtering techniques.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Explore transfer learning for low-resource languages.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Investigate graph neural networks for social network analysis.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Develop an interpretable AI model for credit scoring.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Research the integration of symbolic AI with neural networks.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Implement an efficient algorithm for real-time object detection.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Explore natural language processing for automatic code generation.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Develop a robust system for anomaly detection in network traffic.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Investigate optimization techniques for distributed machine learning.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Design a virtual assistant using state-of-the-art NLP techniques.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Research efficient methods for data compression in neural networks.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Explore meta-learning approaches for rapid model adaptation.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Develop a system for real-time translation using deep learning.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Investigate unsupervised learning methods for feature extraction.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Create a tool for automated essay scoring using NLP.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Research methods to improve the efficiency of graph algorithms.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Develop a hybrid model combining rule-based and statistical AI.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Explore multi-task learning to improve model generalization.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Design an AI framework for personalized education systems.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Investigate the use of GANs for synthetic data generation.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Develop a platform for collaborative machine learning research.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Research energy-efficient algorithms for embedded AI systems.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Explore the application of AI in predicting climate change patterns.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Design a system for real-time speech recognition and translation.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Investigate the impact of bias in machine learning algorithms.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Develop an explainable AI model for autonomous vehicles.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Research techniques for automated hyperparameter tuning.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Explore reinforcement learning for game strategy development.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Design a secure system for digital identity verification using AI.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Investigate deep reinforcement learning for industrial automation.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Develop an AI system for predictive maintenance in manufacturing.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Research the application of AI in optimizing supply chain logistics.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Explore algorithmic approaches for solving combinatorial optimization problems.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Design a tool for visualizing and interpreting deep neural networks.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Investigate the use of AI in personalized healthcare recommendations.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Create a system for detecting misinformation using machine learning.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Research efficient methods for sentiment analysis on social media.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Explore self-supervised learning techniques for natural language understanding.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Design a deep learning model for protein structure prediction.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Investigate the role of AI in enhancing cybersecurity measures.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Develop a system for automated bug detection in software code.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Research methods for optimizing parallel processing in AI systems.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Explore AI-driven approaches to optimize urban traffic flow.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Design a predictive model for energy consumption using machine learning.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Investigate the potential of reinforcement learning in finance.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Develop a tool for automatic summarization of large documents.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Research the integration of IoT with AI for smart home applications.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Explore adaptive algorithms for dynamic resource allocation in cloud computing.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Design a system for automated pattern recognition in satellite images.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Investigate techniques for compressing deep neural networks for mobile deployment.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Develop a framework for secure data sharing using blockchain and AI.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Research the application of neural networks in real-time fraud detection.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Explore unsupervised techniques for clustering large datasets.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Design an AI model for predicting academic performance based on behavioral data.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Investigate the use of AI in optimizing renewable energy systems.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Develop a system for real-time monitoring of network security threats.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Research methods to integrate multi-sensor data for improved perception in robotics.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Explore the use of AI in automating the process of medical diagnosis.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Design a conversational AI system for customer service applications.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Investigate the application of deep learning in natural disaster prediction.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Develop a model for detecting and mitigating cyber threats in real-time.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Research the use of AI in automating legal document analysis.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Explore advanced algorithms for solving NP-hard problems in theoretical CS.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Design an AI system to optimize resource allocation in smart grids.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Investigate reinforcement learning for dynamic pricing models in e-commerce.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Develop a tool for automated code refactoring using machine learning.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Research methods for improving the interpretability of complex AI models.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Explore hybrid models that combine symbolic AI with neural networks for problem-solving.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Design a platform for collaborative research in data science and AI.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Investigate the use of generative models for artistic content creation.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Develop an AI-driven system for monitoring environmental changes.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Research adaptive learning systems for personalized education.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Explore the application of machine learning in bioinformatics.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Design a system for detecting plagiarism using AI techniques.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Investigate the role of AI in predictive analytics for sports performance.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Develop an algorithm to optimize scheduling in transportation networks.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Research the integration of AI with augmented reality for immersive experiences.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Explore unsupervised learning for discovering hidden patterns in big data.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Design an AI model to optimize resource allocation in smart cities.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Investigate the application of deep learning for detecting financial fraud.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Develop a system for automating the diagnosis of diseases using AI.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Research techniques for improving real-time decision-making in autonomous vehicles.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Explore the use of AI in optimizing renewable energy resource management.",
            },
          ],
        },
        {
          title: "Graduate Seminar: Innovations in CS",
          main_post:
            "This thread is dedicated to discussing the latest innovations presented in the graduate seminar on computer science. Share your insights, opinions, and questions regarding cutting-edge research and emerging technologies. Let's delve into topics such as deep learning, quantum computing, neuromorphic architectures, federated learning, and more.",
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          replies: [
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The seminar on deep learning architectures was groundbreaking.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I was impressed by the discussion on quantum computing applications.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The talk on neuromorphic computing provided fascinating insights into brain-inspired designs.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Federated learning was presented as a promising way to preserve data privacy.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The innovations in explainable AI really stood out for building trust in models.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I found the session on reinforcement learning applications in robotics very practical.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Graph neural networks are opening up new ways to analyze relational data.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The seminar's focus on meta-learning showed how models can learn to learn.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Transfer learning remains a powerful tool for adapting pre-trained models to new tasks.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Integrating symbolic reasoning with neural networks is a hybrid approach I find very intriguing.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Multi-modal learning techniques are enabling us to combine text, images, and audio effectively.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Edge computing, when paired with AI, is revolutionizing real-time data processing.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I appreciated the insights on adversarial training to build more secure models.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The session on automated machine learning (AutoML) showed great potential for optimizing workflows.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Sustainable AI and green computing were presented as essential trends for the future.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The talk on blockchain for secure data sharing in CS was innovative.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Ethical AI and bias mitigation are becoming central as models influence critical decisions.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I'm excited about the potential of quantum machine learning for complex data analysis.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Model compression techniques are vital for deploying models on mobile devices.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The integration of computer vision with NLP is yielding fascinating multi-modal models.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Advances in reinforcement learning continue to impress me, especially in autonomous systems.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Graph embeddings are enhancing our analysis of social networks and biological data.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Synthetic data generation is a useful method for training in data-scarce scenarios.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Interpretable machine learning is essential for transparent decision-making.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Neural architecture search is automating the design of optimal deep learning models.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Sparse networks and quantization are critical for efficient model deployment.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Adversarial training is key to improving model robustness against attacks.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Deep learning continues to transform healthcare, especially in diagnostics.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Data-centric AI emphasizes the importance of high-quality datasets.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I'm intrigued by recent developments in multi-agent systems and their coordination.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Attention mechanisms are expanding beyond NLP into vision and audio tasks.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Hybrid models that blend rule-based and statistical methods are gaining traction.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Scalable distributed systems remain a challenge as datasets grow larger.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Hardware accelerators like GPUs and TPUs are crucial for efficient model training.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Privacy-preserving techniques, such as federated learning, are critical in today's data environment.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Integrating computer vision with reinforcement learning is opening new research avenues.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The potential of self-supervised learning to reduce labeling costs is very promising.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Zero-shot and few-shot learning methods are pushing the boundaries of what AI can achieve.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Model compression and pruning techniques are essential for deploying AI in embedded systems.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Interdisciplinary research, particularly AI in healthcare, is yielding innovative applications.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I'm excited about advances in neuromorphic computing for energy-efficient processing.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The seminar highlighted the importance of robust optimization techniques in training deep models.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I'm interested in the emerging research on meta-learning for rapid adaptation.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The discussion on graph convolutional networks provided new insights into network analysis.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Innovative data augmentation techniques were also a key part of the seminar.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I appreciated the session on optimizing neural network training through advanced regularization methods.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The exploration of adaptive learning rates and optimization algorithms was very insightful.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The seminar's comprehensive overview of innovations in CS was truly inspiring.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I look forward to seeing these innovations applied in real-world scenarios.",
            },
          ],
        },
        {
          title: "Discussion: AI and Machine Learning",
          main_post:
            "This thread is dedicated to discussing AI and Machine Learning. Please share your insights, experiences, and questions about the latest advancements in AI, including topics such as deep learning, reinforcement learning, natural language processing, computer vision, and more.",
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          replies: [
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Deep learning has revolutionized the field of AI with its ability to process large datasets.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Reinforcement learning is showing promising results in game AI and robotics.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Natural language processing models like transformers have transformed text understanding.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Computer vision systems are achieving high accuracy thanks to convolutional neural networks.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Generative models like GANs are opening up new possibilities in creative applications.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Ethical AI is crucial; we need to address bias and fairness in our models.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Federated learning is an innovative approach for privacy-preserving machine learning.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Transfer learning helps leverage pre-trained models for various tasks, saving time and resources.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Meta-learning is fascinating as it enables models to learn how to learn.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Self-supervised learning techniques are reducing our reliance on labeled data.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The integration of AI in healthcare has the potential to improve diagnostic accuracy.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Explainable AI is necessary to build trust and interpret complex model decisions.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Neuromorphic computing is inspiring new hardware architectures that mimic the human brain.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Quantum computing research could revolutionize AI by solving intractable problems.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Model compression and pruning are essential for deploying AI models on mobile devices.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Attention mechanisms have significantly improved sequence modeling performance.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Reinforcement learning combined with simulation environments is pushing the boundaries in robotics.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Graph neural networks offer powerful tools for analyzing complex relational data.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Interdisciplinary research between AI and neuroscience is yielding fascinating insights.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Edge computing paired with AI is revolutionizing real-time data processing.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Cloud-based AI services are making advanced machine learning more accessible.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Data augmentation techniques are improving the robustness of training models.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Adversarial training is critical for enhancing the security of AI systems.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Generative models are transforming not only images but also music and art.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Semi-supervised learning is a promising area to leverage both labeled and unlabeled data.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Hyperparameter optimization is key to unlocking optimal model performance.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Ensemble methods can significantly boost the accuracy of predictions.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "AutoML tools are democratizing machine learning by automating model selection.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Zero-shot learning enables models to generalize to unseen classes effectively.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Few-shot learning is making it possible to learn new tasks with minimal data.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Multi-modal learning is enabling the integration of text, image, and audio data.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Neural architecture search is automating the discovery of effective model structures.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Unsupervised learning approaches are gaining momentum in extracting meaningful features.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Scalability of deep learning models remains a major research focus.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Advancements in hardware like GPUs and TPUs are accelerating AI research.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Interpretability techniques are essential for understanding complex AI models.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Open-source AI frameworks have significantly boosted innovation in the field.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Data-centric AI emphasizes the importance of high-quality, curated datasets.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "AI applications in climate modeling are showing impressive promise.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Robust optimization is essential for training models that generalize well.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I believe sustainability and energy efficiency will drive the next wave of AI research.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The synergy between AI and robotics is enabling more autonomous systems.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Algorithmic fairness is critical for deploying responsible AI.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Causal inference in AI is opening new avenues for understanding data relationships.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Integrating domain knowledge into models is a promising research direction.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Few-shot learning techniques are making AI more adaptable to new tasks.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The fusion of symbolic reasoning and neural networks is an emerging trend.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Self-supervised learning is reducing the need for large annotated datasets.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Attention mechanisms continue to transform various AI applications beyond NLP.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Hybrid models that combine rule-based and statistical approaches are gaining interest.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Scalable distributed systems are essential as the volume of data keeps growing.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Hardware accelerators like GPUs and TPUs continue to push the boundaries of AI research.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Privacy-preserving techniques such as federated learning are crucial in today's data landscape.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Integrating computer vision with reinforcement learning is opening new research avenues.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Self-supervised approaches are reducing labeling costs significantly.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Zero-shot and few-shot learning are expanding the possibilities of AI.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Model compression techniques are vital for deploying AI in resource-constrained environments.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Interdisciplinary research, especially in healthcare, is producing innovative AI applications.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Advances in neuromorphic computing offer energy-efficient processing solutions.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Robust optimization strategies are crucial for training reliable models.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I'm excited about the potential of meta-learning for rapid model adaptation.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Graph convolutional networks are enhancing our ability to analyze complex data structures.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Innovative data augmentation techniques are proving effective in model training.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Optimizing neural network training with adaptive learning rates is an area of active research.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The future of AI looks promising with continuous breakthroughs in both algorithms and hardware.",
            },
          ],
        },
      ],
    },
    {
      title: "Fall 2021 Tech & Social Events",
      group: "batch",
      type: "discussion",
      threads: [
        {
          title: "Welcome Batch 2021: Orientation Discussion",
          main_post:
            "This thread is dedicated to all Batch 2021 students to share their thoughts, ask questions, and discuss their experiences from the orientation. Welcome Batch 2021: Orientation Discussion.",
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          replies: [
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I found the orientation session helpful for understanding the course structure.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The campus tour was well-organized and insightful.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I have a question about the registration process mentioned during orientation.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The Q&A session clarified many of my doubts.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I appreciated the friendly atmosphere during orientation.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The orientation video was engaging and clear.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I learned a lot about the university's support services in the session.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The schedule for orientation was perfectly planned.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I found the session on academic expectations very useful.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The campus map provided during orientation was very helpful.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I enjoyed the interactive parts of the orientation.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The information on extracurricular activities was very motivating.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I have some feedback regarding the presentation style.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The orientation helped me connect with fellow batchmates.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I appreciated the details on student services and resources.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The technical support introduction was very clear.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The faculty introductions were warm and welcoming.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I was impressed by the clarity of the administrative procedures explained.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I enjoyed the orientation breakout sessions.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The session on campus safety was very reassuring.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The tour of the library facilities was impressive.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I appreciated the insights into the academic calendar.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The session on career services was very informative.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I found the explanation of course registration steps useful.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The orientation provided clear instructions for accessing the LMS.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I enjoyed the mix of formal and informal segments during the orientation.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The Q&A session was interactive and addressed my questions.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The student panel discussion gave great insights into university life.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I appreciated the overview of student clubs and organizations.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The orientation gave a clear picture of what to expect in the semester.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I was particularly impressed by the demonstration of the online portal.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The orientation helped me plan my schedule for the upcoming term.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The campus tour highlighted all the important areas effectively.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I have a suggestion to improve the clarity of the presentation slides.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The session on mental health resources was very supportive.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I appreciated the detailed guide on campus navigation.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The introduction to the administrative team was very professional.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I learned about several useful student support initiatives.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The orientation fostered a sense of community among us.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The presenter addressed common concerns very effectively.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I found the interactive polls during the orientation fun and engaging.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The explanation of grading policies was straightforward and helpful.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I appreciated the chance to ask questions during the live session.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The session on extracurricular involvement inspired me to join new clubs.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I learned a lot about the campus resources available to us.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The orientation was well-paced and kept my attention throughout.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I felt more confident about starting classes after the session.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The detailed map of campus facilities was a useful resource.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I found the orientation to be both informative and inspiring.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The session clarified many procedural aspects for new students.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I appreciated the friendly environment during the orientation meeting.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The overview of student organizations helped me decide which to join.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I have a question about the scheduling of certain orientation events.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The session on digital resources was extremely helpful.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I found the campus tour to be a great introduction to the university layout.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The faculty members were approachable and answered questions well.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I appreciated the detailed instructions for registering for classes.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The orientation session was interactive and well-organized.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I learned about the various academic support services available.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The Q&A portion of the orientation was particularly useful.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I found the campus safety briefing to be very reassuring.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The session on student rights and responsibilities was enlightening.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I appreciated the clear explanation of the university’s code of conduct.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The orientation introduced me to many key university contacts.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I was impressed by the efficiency of the registration process explained.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The orientation made me feel more prepared for the academic challenges ahead.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I appreciated the breakdown of the orientation schedule.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The session on campus life provided valuable insights into daily routines.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I found the orientation session to be a comprehensive introduction to university life.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The discussion on academic expectations was very clear and helpful.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I appreciated the overview of available campus facilities.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The orientation successfully addressed many common concerns for new students.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I learned about several student support programs that I wasn’t aware of.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The detailed presentation on administrative procedures was very informative.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I enjoyed the interactive segments where we could ask questions in real time.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The session on navigating the LMS was very well-structured.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I appreciated the practical advice on managing coursework and deadlines.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The orientation offered a great mix of informational and interactive content.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I found the session on campus traditions very interesting and engaging.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The introduction to the student portal was thorough and easy to follow.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I have some suggestions to further enhance the orientation experience.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The discussion on campus clubs provided a good overview of extracurricular options.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I appreciated the opportunity to interact with both faculty and peers during the session.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The orientation clearly outlined the steps for academic registration.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I found the session on student health services very supportive and informative.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The detailed campus tour helped me get familiar with key locations.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I appreciated the session on balancing academics with social activities.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The orientation was a solid start to my university experience.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I learned a lot about the different resources available to new students.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The session on financial aid and scholarships provided practical advice.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I appreciated the clear guidelines on how to access online academic resources.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The interactive elements of the orientation made it more engaging and fun.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I found the session on career services to be both informative and motivating.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The orientation helped clarify the process for enrolling in courses.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I appreciated the discussion on time management and study strategies.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The detailed explanation of campus facilities was very helpful.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I found the orientation session to be a valuable introduction to the university culture.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The Q&A segment addressed many of my initial concerns about campus life.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I appreciated the focus on both academic and social aspects of the orientation.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The orientation laid a strong foundation for a successful university journey.",
            },
          ],
        },
        {
          title: "Study Group Formation for Batch 2021",
          main_post:
            "This thread is dedicated to all Batch 2021 students for forming study groups for collaborative learning and exam preparation. Please share your availability, subjects of interest, and any resources you can contribute to help us work together effectively.",
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          replies: [
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I'm interested in joining a study group for math and statistics.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I prefer virtual study sessions, can we use Zoom?",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I'm available on Tuesday evenings for group study.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I have comprehensive notes on calculus to share.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I'm looking for a group to discuss physics problems.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I suggest we form a group for computer science exam preparation.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I'm interested in joining a study group focusing on literature.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I can contribute by sharing past exam papers and summaries.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I have some resources for history that might benefit the group.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I'm available on Wednesday afternoons for group meetings.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I can help organize our study sessions using a shared calendar.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I'm keen on joining a study group for organic chemistry.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I suggest we rotate meeting times to accommodate everyone.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I would love to join a study group focused on economics.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I have experience in group studies and can help moderate discussions.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I'm interested in forming a study group for engineering subjects.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I have a collection of practice problems that could be useful.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I'm available for study sessions on Friday mornings.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I prefer in-person meetings at the library if possible.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I can set up a group chat for easier coordination.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I'm interested in a study group to review lecture notes collectively.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I can share my digital notes on linear algebra with the group.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I suggest we meet weekly to stay on track with our syllabus.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I have some flashcards that helped me with memorization, willing to share.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I'm looking for a group to help prepare for mid-term exams.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I propose we divide topics among us for more efficient study sessions.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I can offer my expertise in problem-solving techniques.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I'm available on Saturday afternoons for group study.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I recommend we have occasional mock tests to gauge our progress.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I have access to some online resources that can supplement our studies.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I'm interested in a study group that covers both theoretical and practical aspects.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I can contribute by leading a discussion on key topics in our course.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I'm looking for peers who want to form a study group for exam preparation.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I suggest we use collaborative tools like Google Docs for note-sharing.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I have previously organized study sessions successfully and can help with logistics.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I'm keen to join a group that meets twice a week for focused study sessions.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I can share my schedule so we can plan meetings that suit everyone.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I propose we start with a trial meeting to see how effective the group is.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I'm interested in forming a study group to tackle advanced problems together.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I have some practice quizzes that I can circulate among the group.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I suggest we assign roles within the group for better organization.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I'm available for online sessions on Monday evenings.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I would like to join a study group to discuss assignments in detail.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I can contribute by summarizing key points from our lectures.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I'm interested in a group where we can review and critique each other's work.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I have some effective revision techniques I'd like to share with the group.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I suggest we meet at the campus café for informal study sessions.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I'm available on Sunday mornings for a relaxed study session.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I propose that we use a rotating schedule for hosting study sessions.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I can share a list of useful textbooks and online resources.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I'm interested in joining a study group for programming assignments.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I suggest we form a group that also focuses on developing soft skills.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I can contribute by sharing summaries of research papers relevant to our course.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I'm available on Thursday evenings for group study.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I propose a mix of individual study and group discussion sessions.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I have a set of practice problems in statistics that could benefit us.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I'm interested in a study group that emphasizes critical thinking and analysis.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I can help coordinate study sessions via a shared online calendar.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I suggest we start with a meeting to outline our study goals for the semester.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I'm available for group sessions on weekday afternoons.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I can share my study tips on how to manage time effectively during exam season.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I propose we use a messaging app to stay in constant contact about study sessions.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I'm interested in joining a study group that covers multiple subjects.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I have a collection of solved problems in differential equations that I can share.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I suggest we take turns presenting topics to reinforce our understanding.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I'm available on Friday evenings for focused revision sessions.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I propose we prepare a group study plan that outlines all topics to be covered.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I can offer insights from previous exam experiences to help the group.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I'm interested in a study group that can provide mutual support during exams.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I have some effective mnemonic techniques that I use for memorization.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I suggest we establish clear objectives for each study session.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I'm available for online study sessions on Wednesday evenings.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I propose that we use a shared folder for all our study materials.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I can contribute by creating summary sheets for each chapter we cover.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I'm interested in a study group that focuses on collaborative problem-solving.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I suggest we have regular check-ins to track our progress.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I'm available on Tuesday mornings for group study.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I propose we alternate between in-person and online study sessions.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I can share some of my notes on advanced topics from our lectures.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I'm interested in joining a group that helps break down complex subjects.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I suggest we create a study forum where we can post questions and answers.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I'm available on Saturday evenings for comprehensive group review sessions.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I propose that we schedule mock exams periodically to assess our readiness.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I can contribute by compiling a list of key concepts for each subject.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I'm interested in a study group that encourages interactive learning.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I suggest we use video conferencing tools for our online sessions.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I'm available on Monday mornings for early study sessions.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I propose that we rotate the role of session leader to keep ideas fresh.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I can share my experience from previous study groups that worked well.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I'm interested in joining a group that focuses on both revision and discussion.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I suggest we create a digital bulletin board to post study materials and updates.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I'm available on Thursday mornings for group study sessions.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I propose we organize periodic review sessions before major exams.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I can offer one-on-one help for topics you find challenging.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I'm interested in a study group that fosters a collaborative learning environment.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I suggest we create a schedule that accommodates everyone’s availability.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I'm available for virtual study sessions on Sunday evenings.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I propose we maintain a shared document to track our progress and goals.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I can share effective study strategies that have worked well for me in the past.",
            },
          ],
        },
        {
          title: "Upcoming Batch Events Schedule",
          main_post:
            "Upcoming Batch Events Schedule: In this thread, details regarding the schedule for upcoming events in our batch are discussed. You can find information about sports events, cultural fests, seminars, registration deadlines, and various other activities tailored for our batch. Please share any updates, timings, venues, and additional details to help everyone stay informed and coordinate their participation.",
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          replies: [
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The sports day is set for next Friday at the main stadium.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The cultural fest is scheduled for October with registration opening next week.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "A guest lecture on entrepreneurship is planned for Tuesday afternoon.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "There’s a digital skills workshop arranged for this weekend.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Campus orientation for new students begins next Monday.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "A guided campus tour is scheduled for Wednesday morning.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The debate competition registration closes tomorrow.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The annual tech symposium is slated for early next semester.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "A volunteer drive is organized on campus this Saturday morning.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The book fair will be held during the first week of next month.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "A career fair is planned for next month with several companies attending.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The music concert by the student union is scheduled for Friday evening.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "An art exhibition is set for the end of this week in the main hall.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "A health and wellness seminar is arranged for next Thursday.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "A basketball skills workshop is planned for Saturday afternoon.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "A film screening event is set for this coming weekend.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "A cultural dance performance is scheduled for next Friday evening.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "A photography contest announcement is due next Tuesday.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The drama club will present a short play on Thursday.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "A coding bootcamp is arranged for interested students next week.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "A culinary event featuring local cuisines is scheduled for Saturday.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "A student leadership seminar is planned for next Monday.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "An environmental awareness workshop is arranged for this Wednesday.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The alumni meet is confirmed for next month in the auditorium.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "A creative writing workshop is scheduled for early next week.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The design club’s fashion show is planned for next Saturday.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "An inter-departmental quiz competition is set for Friday.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "A networking event with industry professionals is scheduled for next Thursday.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The annual charity run is scheduled for this Sunday morning.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "A literary festival is planned for the coming month.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "A student debate on current events is scheduled for next Wednesday.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The robotics club is hosting a mini expo next week.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "A seminar on financial literacy is arranged for this Friday.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The sustainability fair is set for the end of this month.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "A workshop on public speaking is scheduled for next Tuesday.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "A campus clean-up drive is planned for this Saturday morning.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The student film festival will take place over the weekend.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "A workshop on mindfulness and stress management is scheduled for next Thursday.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Registration for the inter-batch sports meet closes soon.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "A dance workshop for beginners is arranged for next Wednesday.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "A panel discussion on academic success is scheduled for next Monday.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Registration for the coding hackathon opens this Friday.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "A seminar on innovation and creativity is set for next Tuesday.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "An interactive session on career planning is scheduled for tomorrow.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The inter-college art competition is confirmed for next month.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "A session on time management skills is arranged for this week.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "An orientation session for new club members is scheduled for next Thursday.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "A debate on social issues is scheduled for Friday afternoon.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "A workshop on effective study techniques is planned for next Saturday.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The campus open house for prospective students is next Monday.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "A financial aid information session is arranged for this Thursday.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Registration for the robotics competition is now open.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "A workshop on resume building is scheduled for next Tuesday.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "A panel discussion on global technology trends is set for next Friday.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The sports club is organizing a friendly football match this weekend.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "A career development seminar is planned for next Wednesday.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "A photography workshop is arranged for this Saturday.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The music club’s live performance is scheduled for next Monday evening.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "A seminar on digital marketing strategies is set for tomorrow.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "A student-led forum on current affairs is scheduled for next Tuesday.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The entrepreneurship workshop is slated for next Thursday.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "A creative arts workshop is arranged for this weekend.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "A community service project briefing is planned for next Monday.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The book club will discuss new releases tomorrow.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "A seminar on cybersecurity awareness is scheduled for next Friday.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "A guest lecture on artificial intelligence is set for this Wednesday.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Registration for the inter-batch sports tournament is open now.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "A workshop on graphic design is arranged for next Saturday.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "A campus safety briefing is scheduled for tomorrow morning.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The leadership training program kicks off next week.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "A session on innovative learning techniques is arranged for this Friday.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "A networking breakfast event is scheduled for next Monday.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The environmental club is hosting a tree planting drive this weekend.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "A seminar on modern art trends is set for next Thursday.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "A group discussion on exam preparation tips is planned for tomorrow.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The student government election forum is scheduled for next Wednesday.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "A workshop on stress relief and yoga is arranged for this Saturday.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "A cultural exchange event is scheduled for next month.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The sports day itinerary was updated last week.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "A seminar on creative problem-solving is set for next Tuesday.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "An art and craft fair will be held this weekend.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The debate club meeting is scheduled for tomorrow afternoon.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "A workshop on effective communication skills is arranged for next Monday.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "A guest lecture on international relations is set for this Friday.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "A campus tour for new batch members is scheduled for next Wednesday.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "A session on research opportunities is planned for tomorrow.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "A discussion on academic policies is scheduled for next Thursday.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Volunteer registration for community outreach closes soon.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "A workshop on financial management for students is set for next Saturday.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "A guest panel on technological innovations is arranged for this Tuesday.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The student art exhibition is scheduled for next month.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "A seminar on leadership and team building is planned for next Friday.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "A discussion on campus dining options is set for tomorrow.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The sports club meeting for the upcoming tournament is this Wednesday.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "A workshop on language skills is scheduled for next Monday morning.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "A briefing on new academic regulations is set for tomorrow afternoon.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The environmental campaign kickoff is scheduled for next Saturday.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "A session on digital innovation in education is arranged for next Thursday.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "A review session for last semester's results is set for next Tuesday.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The campus event coordination meeting is scheduled for tomorrow evening.",
            },
          ],
        },
        {
          title: "Social Events Planning for Batch 2021",
          main_post:
            "Internship Opportunities for Batch 2021: This thread is dedicated to sharing information about various internship openings available to Batch 2021 students. Please share details on companies offering internships, application tips, important deadlines, and personal experiences from the application process to help everyone navigate these opportunities effectively.",
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          replies: [
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "XYZ Corp is offering a summer internship in software development. Check their careers page for details.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "ABC Bank has an early application deadline for its finance internship program.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I attended an internship workshop by the career center—highly recommend it for resume tips.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "DEF Industries is accepting applications for their engineering internship; the process is straightforward.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "GHI Ltd. offers a marketing internship with flexible work options and remote possibilities.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "JKL Technologies has remote internships available for computer science students.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "MNO Consulting is looking for interns with strong analytical skills; check out their website for application details.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "PQR Media has an opening for a digital content creation internship. It's a great opportunity for creatives.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "STU Innovations is recruiting research assistants for their R&D department.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "VWX Pharmaceuticals is offering internships in biotech research; the positions are competitive.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I received a referral for an internship at YZA Enterprises in management. The process was smooth.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Non-profit organizations are also offering internships—check the university bulletin for more info.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "BCD Analytics is recruiting for a data analytics internship; it's a great way to apply your statistical skills.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "EFG Motors is looking for interns interested in automotive design and innovation.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "For tech roles, I recommend browsing LinkedIn—many startups are offering remote internships.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "HIJ Startups often provide hands-on internship opportunities that can boost your practical experience.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "KLM Retail has a summer internship program that blends operations with analytics.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "NOP Financial is offering internships in investment banking—ideal for those with a finance background.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "QRS Media is looking for content writers; I applied and found the process quite efficient.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "TUV Healthcare is recruiting interns for roles in medical research—check their application portal for deadlines.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I attended a webinar on AI internships which mentioned opportunities at WXY Software.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "YZAB Consultancy offers internships that provide exposure to strategic planning and client work.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I found a finance internship at CDE Capital—make sure to review their eligibility criteria.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "EFG Motors is also offering a design internship; it's perfect for creative engineering students.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "HIJ Logistics has an internship combining operations with data analytics—worth checking out.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "KLM Tech is offering remote internships in web development. Their application process is very user-friendly.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "NOP Finance offers a summer internship in financial modeling; it's competitive but rewarding.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "QRS Consulting is recruiting interns to assist with market research projects.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "TUV Innovations is looking for interns in emerging tech—ideal for those interested in startups.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "WXY Digital recently opened positions for content strategy interns; it's a creative role.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "YZAB Manufacturing has an internship focused on process optimization, a great fit for engineering students.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "ABC Consulting offers internships that involve real client projects and strategic planning.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "BCD Tech has a role in user experience design; a strong portfolio will help your application.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "CDE Healthcare is offering internships in biomedical research; check their eligibility before applying.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "DEF Creative Agency is recruiting for brand strategy interns—perfect for creative minds.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "EFG Logistics has internships providing hands-on experience in supply chain management.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "FGH Retail offers internships that combine customer service with operational analytics.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "GHI Tech is recruiting interns for roles in cloud computing and cybersecurity.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "HIJ Media offers a digital marketing internship that includes hands-on content creation.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "JKL Legal is looking for interns to support legal research and documentation.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "KLM Finance has a robust internship program for aspiring financial analysts.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "LMN Engineering offers internships in electrical design—great for hands-on learners.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "MNO Energy is recruiting interns for sustainable development projects.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "NOP Marketing has internship openings in brand management and advertising.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "OPQ Consulting seeks interns with a focus on data-driven business strategies.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "PQR Tech offers internships in robotics and artificial intelligence.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "QRS Healthcare is recruiting interns for health informatics projects.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "RST Creative Agency has internship opportunities in multimedia production.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "STU Finance offers a summer internship program in market research and analysis.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "TUV Retail is recruiting interns to improve customer experience and operational efficiency.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "UVW Tech has openings for interns in software testing and quality assurance.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "VWX Media offers internships in photography and visual storytelling.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "WXY Consulting is recruiting interns to help with digital transformation projects.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "XYZ Legal offers internships for students interested in legal research and case studies.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "YZA Innovations has an internship program focused on product innovation and prototyping.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "ABC Finance is recruiting interns for roles in financial analytics and forecasting.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "BCD Tech offers internships in UX design and front-end development.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "CDE Healthcare has an internship program in biomedical research.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "DEF Creative Agency is looking for interns in brand strategy and digital marketing.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "EFG Logistics offers internships that provide practical experience in supply chain management.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "FGH Retail is recruiting interns to assist with inventory management and sales analytics.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "GHI Tech is seeking interns in cloud computing and network security.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "HIJ Media offers a digital marketing internship with hands-on experience in content creation.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "JKL Legal is recruiting interns to assist with corporate law research.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "KLM Finance has a competitive internship program for aspiring financial consultants.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "LMN Engineering offers internships in mechanical and electrical design.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "MNO Energy is recruiting interns for sustainable development projects.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "NOP Marketing has internship openings in brand management and advertising.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "OPQ Consulting is looking for interns with a knack for data-driven strategies.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "PQR Tech offers internships in robotics and AI research.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "QRS Healthcare is recruiting interns for roles in health informatics.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "RST Creative Agency offers internships in multimedia production and content creation.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "STU Finance has a summer internship program focusing on market research.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "TUV Retail is recruiting interns to improve customer experience and operational workflows.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "UVW Tech offers internships in software testing and quality assurance.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "VWX Media is seeking interns in photography and visual storytelling.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "WXY Consulting has internship opportunities to support digital transformation initiatives.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "XYZ Legal is recruiting interns for legal research and documentation.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "YZA Innovations offers internships focused on product development and innovation.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "ABC Finance is recruiting interns for financial analytics and forecasting roles.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "BCD Tech has internship openings in UX design and front-end development.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "CDE Healthcare offers an internship program in biomedical research.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "DEF Creative Agency is looking for interns to assist with brand strategy and digital marketing.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "EFG Logistics provides internships that offer practical experience in supply chain management.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "FGH Retail is recruiting interns for roles in inventory management and sales analytics.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "GHI Tech is seeking interns in cloud computing and network security.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "HIJ Media offers a digital marketing internship with hands-on experience in content creation.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "JKL Legal is recruiting interns to assist with corporate law research.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "KLM Finance has a competitive internship program for aspiring financial consultants.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "LMN Engineering offers internships in mechanical and electrical design.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "MNO Energy is recruiting interns for sustainable development projects.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "NOP Marketing has internship openings in brand management and advertising.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "OPQ Consulting seeks interns with a knack for data-driven strategies.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "PQR Tech offers internships in robotics and AI research.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "QRS Healthcare is recruiting interns for roles in health informatics.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "RST Creative Agency offers internships in multimedia production and content creation.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "STU Finance has a summer internship program focusing on market research.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "TUV Retail is recruiting interns to improve customer experience and operational workflows.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "UVW Tech offers internships in software testing and quality assurance.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "VWX Media is seeking interns in photography and visual storytelling.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "WXY Consulting has internship opportunities to support digital transformation initiatives.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "XYZ Legal offers internships for students interested in legal research and case studies.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "YZA Innovations has an internship program focused on product innovation and prototyping.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "ABC Finance is recruiting interns for roles in financial analytics and forecasting.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "BCD Tech offers internships in UX design and front-end development.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "CDE Healthcare has an internship program in biomedical research.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "DEF Creative Agency is looking for interns to assist with brand strategy and digital marketing.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "EFG Logistics offers internships that provide practical experience in supply chain management.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "FGH Retail is recruiting interns for roles in inventory management and sales analytics.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "GHI Tech is seeking interns in cloud computing and network security.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "HIJ Media offers a digital marketing internship with hands-on content creation.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "JKL Legal is recruiting interns to assist with corporate law research.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "KLM Finance has a robust internship program for aspiring financial analysts.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "LMN Engineering offers internships in electrical design and circuit analysis.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "MNO Energy is recruiting interns for sustainable development projects.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "NOP Marketing offers internships in brand management and advertising.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "OPQ Consulting seeks interns with a focus on data-driven business strategies.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "PQR Tech offers internships in robotics and AI research.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "QRS Healthcare is recruiting interns for roles in health informatics.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "RST Creative Agency offers internships in multimedia production.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "STU Finance has a summer internship program in market research and analysis.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "TUV Retail is recruiting interns to improve customer experience.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "UVW Tech offers internships in software testing and quality assurance.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "VWX Media is seeking interns in photography and visual storytelling.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "WXY Consulting has opportunities for interns to support digital transformation projects.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "XYZ Legal offers internships for legal research and case studies.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "YZA Innovations has an internship program focused on product innovation.",
            },
          ],
        },
      ],
    },
    {
      title: "General Discussion: Campus Life",
      type: "general",
      threads: [
        {
          title: "Balancing Academics and Social Life",
          main_post:
            "This thread is dedicated to sharing strategies, tips, and personal experiences on how to maintain a healthy balance between academic responsibilities and social activities. Whether it's time management, prioritizing tasks, or scheduling downtime, feel free to share what works best for you and learn from others.",
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          replies: [
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I try to set a strict schedule that allocates time for studying and socializing.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Using a planner helps me keep track of both academic deadlines and social events.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I prioritize my assignments and then reward myself with some downtime.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Balancing academics and social life is challenging, but setting clear goals makes it easier.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I dedicate specific hours for studying and ensure I join social gatherings in the evenings.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Joining study groups has helped me manage my time better while also socializing.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I use time-blocking techniques to ensure I don’t neglect my personal life.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Taking regular breaks during study sessions keeps me refreshed and focused.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I schedule social activities only after major assignments are completed.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Maintaining a balance improves my overall productivity and mood.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "A digital calendar helps me coordinate academic and social commitments seamlessly.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I reserve weekends for relaxation and catching up with friends.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Prioritizing tasks based on deadlines is key to managing both work and fun.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I plan my study sessions around my extracurricular activities to avoid conflicts.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Finding a balance is key; I always leave room for both hard work and fun.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I try to avoid procrastination by sticking to a disciplined routine.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Planning ahead allows me to enjoy social events without stress over academics.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I schedule regular exercise as part of my routine to boost focus.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "A balanced lifestyle definitely contributes to academic success.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Setting realistic daily goals helps me maintain balance throughout the week.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I use phone reminders to switch between study mode and leisure time.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I often plan group study sessions that double as social gatherings.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "A structured schedule helps me avoid burnout during exam periods.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I believe in setting aside time for both academic work and personal interests.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Using a weekly plan, I manage to balance study and leisure efficiently.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "A well-organized schedule reduces stress and increases my productivity.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I try to finish assignments early so I can fully enjoy my free time.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Sticking to a routine has been a game-changer for me.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I plan my day in advance to ensure I cover both work and play.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Setting aside specific hours for leisure has really improved my life balance.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I keep my weekends free for hobbies and spending time with friends.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I incorporate short breaks in my study sessions to avoid burnout.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "A good balance of work and play makes me more efficient academically.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I always plan some leisure time after finishing my daily study goals.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Having a daily schedule that includes both study and relaxation is essential.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I often use time-blocking methods to ensure I stick to my planned routine.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I rely on my digital planner to organize all my commitments effectively.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Taking care of my health by balancing academics with social life has been vital.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I set aside time for regular exercise as part of my daily routine.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I always check my schedule the night before to plan for the next day.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Regular review of my timetable helps me adjust for unexpected tasks.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I find that a mix of structured study and leisure time boosts my creativity.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I make sure to take a break every hour during long study sessions.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Balancing academics with social life isn't easy, but a solid routine helps.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I try to stick to my schedule even on weekends to maintain consistency.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I ensure that I have dedicated time for both study and leisure activities.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I use alarms to remind me when it's time to switch from studying to relaxing.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I keep a journal to track how well I'm balancing my academic and social life.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Setting clear boundaries between work and personal time has made a huge difference.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I find that engaging in hobbies helps me recharge for more productive study sessions.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I prioritize my tasks so that I can focus on what's most important each day.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I plan my social events around my study schedule to avoid conflicts.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I believe that a balanced life leads to both academic success and personal happiness.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I always try to end my day with some relaxation to prepare for tomorrow.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I regularly update my planner to reflect new commitments or changes in my schedule.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Maintaining discipline in my routine helps me manage stress effectively.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I ensure to allocate time for both work and fun, even during busy weeks.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I try to maintain consistency in my daily routine to build long-term habits.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Balancing academics and social life is a continuous learning process.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I set aside time for reflection on how well I'm managing my schedule.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I use productivity apps to monitor and adjust my time allocation effectively.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I try to balance rigorous study sessions with creative downtime to stay motivated.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I regularly assess my priorities to ensure a healthy balance between academics and social life.",
            },
          ],
        },
        {
          title: "Tips for Effective Time Management on Campus",
          main_post:
            "This thread is dedicated to sharing strategies, tips, and personal experiences on effective time management on campus. Share the techniques, tools, and routines that help you balance classes, assignments, extracurricular activities, and personal time.",
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          replies: [
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I use a digital calendar to schedule classes, study time, and social activities.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Time blocking helps me allocate specific hours for each task throughout the day.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I set daily goals and review them each morning to stay organized.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Prioritizing tasks by deadline has been key to managing my workload effectively.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I break my study time into focused sessions with short breaks in between.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Using the Pomodoro technique really boosts my concentration and productivity.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I maintain a strict routine to ensure a healthy balance between work and leisure.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Regular breaks help me stay refreshed and prevent burnout during long study sessions.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I schedule social activities only after completing major assignments.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "A well-structured schedule has improved my overall productivity and mood.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I rely on a digital planner to coordinate both academic deadlines and social events.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I reserve weekends for relaxation and catching up with friends.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Prioritizing tasks based on urgency and importance helps me manage my time.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I plan my study sessions around my extracurricular commitments to avoid conflicts.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I believe that a clear schedule allows me to enjoy both work and play without guilt.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I avoid procrastination by sticking to a disciplined routine every day.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Planning ahead gives me the freedom to attend social events without stress.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I make sure to include regular exercise in my schedule to keep my energy levels high.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "A balanced routine not only improves academic performance but also personal well-being.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I set realistic daily goals that I review each evening for progress.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Using phone reminders helps me switch between tasks seamlessly.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Group study sessions often serve as both academic help and social interaction.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I stick to a routine even on weekends to maintain consistency.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "A consistent daily schedule significantly reduces my stress levels.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I plan my day the night before to ensure I have a clear vision for tomorrow.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Regular review of my timetable allows me to adjust for any unexpected changes.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "A mix of structured study and planned leisure time keeps me balanced.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I always end my day by reviewing what I accomplished and planning ahead.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Using a bullet journal helps me track tasks and maintain focus.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I set aside time for hobbies to ensure a well-rounded routine.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Sticking to a schedule has allowed me to manage deadlines better.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I rely on both digital and physical planners to keep my tasks organized.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Prioritizing academic tasks early in the day sets a positive tone for the rest.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I use a time tracker app to see where my time is spent and adjust accordingly.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Scheduling leisure time helps me avoid feeling overwhelmed by studies.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I try to finish assignments ahead of schedule to enjoy free time guilt-free.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Using color-coded calendars makes it easier to differentiate between types of tasks.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I schedule buffer time between tasks to handle any spillover.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I set personal deadlines earlier than the actual ones to stay ahead.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I always review my to-do list first thing in the morning to set my priorities.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Keeping a balance between academic tasks and social activities is essential for mental health.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I use the Pomodoro technique to maintain focus and prevent burnout.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Breaking work into small tasks makes large projects more manageable.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I set realistic goals for each day and celebrate small victories.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Sticking to my study schedule has reduced my overall stress significantly.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I often prepare for the next day by reviewing what I've accomplished.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I make sure to include leisure activities in my schedule to recharge.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I plan group study sessions to combine academic work with social interaction.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I use task management apps to track my progress and adjust my priorities.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I always set aside time for self-reflection to assess my time management skills.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I keep a record of my daily accomplishments to stay motivated.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I find that planning breaks into my schedule enhances my productivity.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I dedicate early mornings for focused study time before the day gets hectic.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I prepare my schedule the night before to start my day with a clear plan.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Maintaining a consistent sleep schedule has really helped me manage my time better.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I try to balance study and leisure by keeping my goals realistic and achievable.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I adjust my schedule based on feedback from my peers and my own experience.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Using both digital and paper planners gives me the flexibility I need.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I allocate time each week for revisiting and refining my study strategies.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I ensure that every study session has a clear objective to maximize efficiency.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I take advantage of productivity tools to help me stick to my planned routine.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I try to set both short-term and long-term goals to guide my daily activities.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I maintain a balance by keeping a strict separation between study and leisure time.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I use color-coding in my planner to easily differentiate between various tasks.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I always try to finish my work ahead of deadlines to allow extra time for unexpected events.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I keep my planner updated with any changes so I can stay flexible and prepared.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Reviewing my schedule regularly helps me understand where I can improve my time management.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I find that a consistent daily routine leads to better overall productivity.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I make it a point to set aside time for relaxation and self-care, as it enhances my focus.",
            },
          ],
        },
        {
          title: "Best Spots for Relaxation and Study",
          main_post:
            "This thread is dedicated to sharing the best spots on campus for relaxation and study. Whether you're looking for a quiet corner in the library, a cozy cafe, or a serene outdoor area, share your favorite spots and tips to help you stay productive and refreshed.",
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          replies: [
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The quiet study room in the main library is my favorite for uninterrupted focus.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I love the cozy corner in the campus cafe; it's perfect for a relaxed study session with a good cup of coffee.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The outdoor seating area by the quad provides fresh air and a change of scenery, which helps me concentrate.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The student lounge near my dorm offers comfortable seating and a laid-back vibe for casual reading.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I usually head to the library's silent zone for deep concentration, especially during exam weeks.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The rooftop terrace of the engineering building is a great spot to study with a view.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I often use the courtyard near the administration building for a quick outdoor study break.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The computer lab in the tech center is quiet in the evenings and ideal for coding sessions.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I enjoy the outdoor benches by the campus park for a peaceful study environment.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The library's individual study nooks are perfect for solo study sessions.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The campus garden is a hidden gem for a quiet moment of reflection and reading.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I love the ambiance of the campus cafe during off-peak hours—ideal for both studying and unwinding.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The modern study area in the new library wing, with lots of natural light, is very inspiring.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I often choose the quiet alcove near the student center for focused work.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The café near the science building offers a cozy space for a productive study session.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The study lounges in the dormitories are great for both individual work and group discussions.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The campus park, with its shady trees, is perfect for a refreshing outdoor study break.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I enjoy the study pods in the tech center for their modern and distraction-free environment.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The reading area in the business school building is quiet and well-equipped for focused work.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I prefer the private study corners in the humanities building for a calm and reflective atmosphere.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The outdoor terrace by the campus lake offers a scenic backdrop for studying.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I love the group study rooms in the main library for collaborative projects.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The library’s multimedia area provides a modern setting for interactive study sessions.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The campus café’s outdoor seating is perfect for a blend of socializing and studying.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I often study at the quiet corners of the engineering lab when it's not busy.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The dedicated study zones in the new academic building are very well-designed.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I appreciate the variety of study spaces available on campus; there's something for every mood.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The quiet library stacks are my go-to when I need to focus intensely.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I enjoy studying at the campus café because it offers a lively yet relaxed atmosphere.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The outdoor study areas near the dorms are great for a change of pace during long study sessions.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The computer lab in the tech center is a productive space, especially in the evenings.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I find that a mix of indoor and outdoor study spots keeps my routine interesting.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The central library’s quiet study area is ideal for deep concentration.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The campus bookstore’s reading nook is a surprisingly quiet place to review notes.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I often study in the modern study hall of the new library wing for its bright atmosphere.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The serene garden near the administration building is a perfect escape for studying outdoors.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I like the private study cubicles in the student center for a distraction-free environment.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The study lounges in the dormitories are comfortable and great for group discussions.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The campus park is ideal for a refreshing study break on sunny days.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The art center has a quiet corner that’s perfect for creative study sessions.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I love the mix of modern facilities and natural surroundings available for study on campus.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The quiet study area in the business school is a great place to focus on complex topics.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I often find inspiration while studying near the campus lake—it’s very calming.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The outdoor benches around the central quad offer a peaceful environment for revision.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I appreciate the small study nooks scattered around the library for quick revision sessions.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The campus cafe's ambient music and comfortable seating make it a great spot to relax and study.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I like using the outdoor study pods in the innovation center when I need a quiet, tech-friendly space.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The quiet lounge near the student union is excellent for group study and discussions.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I find that switching between indoor and outdoor study spots keeps my energy levels high.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The library's private study rooms are perfect for intensive review sessions.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I enjoy the tranquility of the campus park, which is great for both relaxation and focused study.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The modern study halls in the new academic building offer a sleek, distraction-free space.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The cozy seating at the campus cafe provides the perfect ambiance for both studying and unwinding.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I like the quiet corners near the administration building for a quick study session between classes.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The study areas in the student center are spacious and well-lit, ideal for long study sessions.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I enjoy studying in the serene environment of the campus botanical garden during breaks.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The tech center’s quiet zone is a hidden gem for focused work and innovation.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I rely on the library’s group study rooms for collaborative projects and discussions.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The peaceful ambiance of the campus park makes it ideal for both studying and relaxing with friends.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I often choose the library's private study cubicles for uninterrupted concentration.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The modern and quiet area near the new student center is excellent for focused revision.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I enjoy the peaceful study environment provided by the university's quiet zones.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The outdoor seating near the campus quad is perfect for a change of scenery while studying.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I appreciate the variety of study spots on campus; it helps me stay motivated and refreshed.",
            },
          ],
        },
        {
          title: "Ideas for Campus-Wide Events",
          main_post:
            "This thread is dedicated to sharing creative and impactful ideas for campus-wide events. Whether it’s cultural fests, tech expos, charity events, or fun social gatherings, share your innovative ideas to bring our campus community together.",
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          replies: [
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Organize a campus-wide cultural fest featuring diverse performances and international cuisine.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Host an inter-college sports tournament to promote healthy competition among different institutions.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Plan a tech expo showcasing innovative student projects and startup ideas.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Arrange a charity run to support local community initiatives and raise funds for a good cause.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Organize a campus film festival featuring student-made documentaries and short films.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Hold a hackathon that challenges participants to solve real-world problems using technology.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Set up a food festival that highlights cuisines from different cultures represented on campus.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Plan a talent show where students can showcase their diverse skills in music, dance, and drama.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Host a guest lecture series featuring industry experts discussing emerging technologies.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Arrange a digital art and design workshop to encourage creative expression.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Organize a sustainability fair to promote eco-friendly practices and green initiatives.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Plan a campus book fair combined with literary events and author meet-ups.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Host a talent show that gives students a platform to perform and compete for prizes.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Arrange an inter-college sports day that includes both traditional and fun non-traditional events.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Organize a networking event connecting students with alumni and industry professionals.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Hold a cooking competition among students to celebrate culinary talents.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Plan a music concert featuring student bands, solo artists, and DJ performances.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Arrange a debate competition on current social and global issues.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Host a career fair with workshops on resume building and interview skills.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Plan a science exhibition showcasing innovative experiments and research projects.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Organize an entrepreneurship summit for students to pitch startup ideas.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Host a fashion show featuring student designers and sustainable trends.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Arrange a poetry slam and open mic night to encourage literary creativity.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Plan an inter-college sports tournament to foster camaraderie and competition.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Organize a study marathon with peer mentoring sessions during exam season.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Host a themed party or mixer to boost campus spirit and social interaction.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Arrange a tech talk series featuring startup founders and innovators.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Plan an art exhibition to display student artwork and creative installations.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Organize a community service day to give back to local neighborhoods.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Host a digital media workshop to enhance skills in content creation and editing.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Plan a roundtable discussion on environmental sustainability and campus initiatives.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Organize a virtual reality experience event to showcase new tech applications.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Host a coding bootcamp to empower students with programming skills.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Arrange a creative writing workshop that inspires storytelling and expression.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Plan a board game tournament to foster friendly competition and strategy.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Organize a dance workshop where students can learn different styles.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Host a cooking demo by local chefs to introduce students to new cuisines.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Arrange a study group challenge that mixes academic help with social fun.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Plan a leadership summit to develop the skills of future student leaders.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Organize a mini-concert series featuring live music from talented students.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Host a photography contest where students capture unique moments on campus.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Arrange a digital storytelling contest that encourages creative video projects.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Plan a campus scavenger hunt that highlights the hidden gems around our grounds.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Organize a wellness day complete with yoga, meditation, and health screenings.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Host a startup pitch competition to encourage entrepreneurial thinking.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Arrange a sports clinic with professionals to teach advanced skills.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Plan a cultural exchange day where international students share their heritage.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Organize a science fair that allows students to present innovative experiments.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Host a workshop on financial literacy to help students manage their budgets.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Arrange a gaming marathon to raise funds for a charitable cause.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Plan a student film festival that showcases creative short films and documentaries.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Organize a creative coding challenge that combines art with programming.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Host a panel discussion on the future of work and emerging technologies.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Arrange a DIY craft fair to encourage student-made art and products.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Plan a flash mob event to boost energy and campus spirit unexpectedly.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Organize a mentorship day connecting students with experienced alumni.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Host a webinar series on emerging trends in technology and innovation.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Arrange a creative brainstorming session for planning future campus events.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Plan a networking event to connect students with local business leaders.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Organize a workshop on digital art and animation for aspiring creators.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Host an innovation challenge where teams develop solutions for real-world problems.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Arrange a campus-wide open mic night to celebrate student talents.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Plan a series of mini-workshops on various skills, from coding to photography.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Organize a community service day followed by a social picnic.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Host a virtual reality gaming tournament to showcase new technology.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Arrange a panel on the impact of social media on campus culture.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Plan an interactive workshop on effective public speaking and presentation.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Organize a mini-concert with acoustic performances by student musicians.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Host a panel discussion on sustainability and green campus initiatives.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Arrange a creative competition where students pitch innovative event ideas.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Plan a series of themed social mixers to celebrate different cultures on campus.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Organize a virtual networking event to connect students across different departments.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Host a workshop on mindfulness and meditation to promote mental wellness.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Arrange an art contest where students create murals to beautify campus spaces.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Plan a collaborative project event where students work together on community challenges.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Organize a virtual workshop on digital transformation and innovation in education.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Host a session on stress management techniques for a balanced campus life.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Arrange a campus debate on topics that matter to the student community.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Plan an interactive quiz night that tests general knowledge and fun facts.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Organize a workshop on effective leadership and teamwork among students.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Host a discussion panel on the future of campus events in a digital age.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Arrange a photo contest that captures the spirit and diversity of campus life.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Plan a workshop on effective budgeting and planning for event organizers.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Organize a campus fair to highlight local businesses and student entrepreneurship.",
            },
          ],
        },
      ],
    },
    {
      title: "General Discussion: Academic & Career",
      type: "general",
      threads: [
        {
          title: "Strategies for Successful Internship Applications",
          main_post:
            "This thread is dedicated to sharing effective strategies and insights on crafting successful internship applications. Share your tips on resume tailoring, cover letter writing, networking, interview preparation, and how to stand out in a competitive field.",
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          replies: [
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Tailor your resume to highlight relevant skills for each internship application.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Customize your cover letter to match the company's culture and job requirements.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Leverage your network by reaching out to alumni for insights and referrals.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Research the company thoroughly before applying to understand their values.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Practice common interview questions and refine your answers.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Update your LinkedIn profile with your latest projects and experiences.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Showcase your achievements with quantifiable results in your resume.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Attend career fairs to connect with potential employers directly.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Seek feedback from mentors to improve your application materials.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Prepare a portfolio of your work if you're applying for technical roles.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Highlight any relevant coursework or certifications on your resume.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Consider including a personal project that demonstrates your passion.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Tailor your application for each role instead of sending generic submissions.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Join internship workshops to learn application strategies.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Practice mock interviews to build confidence and improve communication skills.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Follow up with a thank-you email after an interview to show appreciation.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Leverage online resources to learn about the latest trends in your field.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Demonstrate soft skills like teamwork and problem-solving in your application.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Keep your resume concise and focused on your most significant accomplishments.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Use action verbs and clear metrics to describe your responsibilities.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Show your adaptability by highlighting diverse experiences in your resume.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Participate in hackathons or coding challenges to strengthen your technical skills.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Create a professional email signature to enhance your communications.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Tailor your application documents for the specific role you're applying to.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Highlight internships or projects that are most relevant to the position.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Network actively on platforms like LinkedIn and attend industry events.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Consider reaching out directly to hiring managers with a personalized message.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Understand the internship programs and their selection process thoroughly.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Prepare a list of questions to ask during the interview to show your interest.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Keep track of your applications to follow up appropriately.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Utilize resume templates that are both modern and professional.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Highlight any leadership roles or volunteer experiences on your resume.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Tailor your resume for technical positions by emphasizing programming skills.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Include relevant keywords from the job description in your application.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Show initiative by mentioning any independent projects or research.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Be honest about your skills and experiences in your application.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Keep your online profiles updated with your latest achievements.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Utilize your university's career services for resume reviews and mock interviews.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Develop a personal brand that reflects your professional aspirations.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Practice articulating your experiences in a clear and concise manner.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Show enthusiasm for the role by conveying genuine interest in the company.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Prepare answers for behavioral questions using the STAR method.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Ensure your resume is error-free and well-formatted before submitting.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Tailor your cover letter to explain how you can add value to the company.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Include specific examples of your problem-solving skills in your application.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Prepare a digital portfolio that showcases your work and projects.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Highlight any relevant research or technical projects that align with the internship.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Reach out to current interns to learn more about the application process.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Maintain a professional tone and language in all your application materials.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Emphasize your cross-functional skills to show versatility.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Showcase any certifications or training programs relevant to the industry.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Proofread your application documents multiple times to avoid mistakes.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Get feedback on your resume from professors or industry professionals.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Emphasize your teamwork and collaboration skills in your cover letter.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Be proactive and follow up with recruiters after submitting your application.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Include references or testimonials if available to strengthen your application.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Highlight any part-time work or internships that demonstrate practical experience.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Keep your application documents concise and focused on your achievements.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Align your application with the company’s mission and values for a better fit.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Update your resume regularly to reflect your most recent accomplishments.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Personalize your LinkedIn profile to mirror your professional narrative.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Attend networking events to expand your industry connections.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Prepare a list of questions for interviews to demonstrate your interest in the role.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Leverage social media platforms to research and connect with potential employers.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Showcase your ability to learn quickly by mentioning relevant coursework and projects.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Highlight experiences that demonstrate leadership and initiative.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Demonstrate adaptability by sharing examples of how you've overcome challenges.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Keep your tone professional and enthusiastic in your cover letter.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Research the company culture to tailor your application accordingly.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Make sure your application is ATS-friendly by using relevant keywords.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Focus on continuous improvement by updating your skills and certifications.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Practice your interview skills with mock sessions to build confidence.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Keep track of your application progress and follow up appropriately.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Be prepared to discuss your experiences in detail during interviews.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Customize each application to emphasize the skills most relevant to the role.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Demonstrate your passion for the field by highlighting extracurricular projects.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Use quantifiable metrics to showcase your achievements and impact.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Show that you are a lifelong learner by including any ongoing training or education.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Prepare your application well in advance to avoid last-minute rush and errors.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Reflect on past experiences to identify what makes you unique as a candidate.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Stay updated with industry trends to better tailor your application.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Always include a call-to-action in your cover letter to prompt further discussion.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Be sure to follow the application instructions carefully to avoid disqualification.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Showcase any awards or recognitions you have received in your academic or professional journey.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Keep your language clear and professional in all your communications.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Highlight projects that illustrate your problem-solving and innovation skills.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Ensure your resume is concise yet informative, focusing on your key strengths.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Emphasize any leadership experiences that demonstrate your ability to take initiative.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Tailor your application narrative to reflect the unique requirements of each role.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Prepare thoroughly for technical interviews by practicing coding problems.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Show your passion for the industry by sharing relevant side projects or research.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Keep improving your soft skills, as they are just as important as technical expertise.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Reflect on feedback from previous interviews to continuously improve your approach.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Keep your portfolio updated with your latest projects and achievements.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Use metrics to quantify your contributions in previous roles.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Show enthusiasm and a willingness to learn in every aspect of your application.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Make sure your application documents are well-organized and easy to read.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Tailor your resume for each application by emphasizing different strengths.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Keep a log of your application progress and follow up with employers when necessary.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Showcase any cross-functional skills that demonstrate versatility.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Be proactive in your job search by networking at career events and online forums.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Ensure that your application stands out by being both detailed and concise.",
            },
          ],
        },
        {
          title: "Effective Study Techniques for Challenging Courses",
          main_post:
            "This thread is dedicated to sharing effective study techniques for tackling challenging courses. Whether you're struggling with difficult topics, complex problem sets, or just looking for ways to boost your learning efficiency, share your methods, tips, and personal experiences here. Let's help each other succeed by learning the best strategies for effective studying.",
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          replies: [
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Break down complex topics into smaller, manageable segments to make them easier to understand.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Use active recall by testing yourself frequently on key concepts rather than just reading passively.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Implement spaced repetition with flashcards to reinforce learning over time.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Join study groups to discuss and clarify challenging topics with peers.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Teach the material to someone else—it’s a great way to identify gaps in your understanding.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Use visual aids like mind maps and diagrams to connect ideas and enhance memory retention.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Practice solving problems under timed conditions to simulate exam scenarios.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Take regular breaks using the Pomodoro technique to keep your mind fresh and focused.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Set specific goals for each study session to stay on track and measure progress.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Review your lecture notes soon after class to consolidate your understanding.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Use online resources like educational videos and tutorials for additional explanations.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Create summary sheets for each topic to quickly review key points before exams.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Experiment with different note-taking methods, such as the Cornell method or bullet journaling.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Schedule regular review sessions to reinforce your learning and prevent cramming.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Practice self-testing by creating quizzes for yourself after studying each chapter.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Break long study sessions into short intervals to maintain high levels of concentration.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Utilize digital tools and apps to track your progress and manage your study time.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Engage in group discussions to benefit from different perspectives on challenging topics.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Prioritize difficult subjects when you're most alert, often in the morning.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Make use of flashcards to drill important formulas and definitions.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Revisit and revise your notes periodically to reinforce long-term memory.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Utilize online platforms like Anki for spaced repetition of key concepts.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Explain complex ideas in your own words to ensure true comprehension.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Attend extra help sessions or tutoring if a topic remains unclear.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Collaborate with classmates on challenging problems to develop diverse solutions.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Use past exam papers to familiarize yourself with the question formats.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Practice writing concise, clear summaries of what you learn each day.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Experiment with different study environments to see where you are most productive.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Focus on understanding the underlying principles instead of just memorizing details.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Plan your study schedule in advance to avoid last-minute cramming.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Break study sessions with short breaks to help maintain focus and reduce fatigue.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Create a dedicated study space that's free of distractions and comfortable.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Use diagrams and flowcharts to visualize complex processes and relationships.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Practice by solving a variety of problems to build both speed and accuracy.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Set measurable goals for each study session to gauge your progress.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Leverage online forums and study groups to exchange ideas on challenging topics.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Review and adjust your study techniques periodically based on what works best.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Use active learning techniques such as problem-solving and teaching to reinforce concepts.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Keep a study journal to reflect on your learning process and identify improvements.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Organize your notes with bullet points and summaries for quick review.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Attend review sessions and recitations offered by your professors.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Utilize study apps that help track your time and manage tasks effectively.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Create a mind map for each major topic to connect ideas and enhance memory.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Practice summarizing information in your own words to ensure retention.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Plan mock exams to test your understanding under timed conditions.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Incorporate both individual study and group discussions for a well-rounded approach.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Experiment with different note-taking strategies until you find one that clicks.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Review difficult topics multiple times until you achieve mastery.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Set aside a specific time each day solely dedicated to revisiting challenging material.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Break long study sessions into focused, short intervals with clear objectives.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Reward yourself after meeting study goals to maintain motivation.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Keep track of your progress and adjust your methods if necessary.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Use online tutorials to supplement your classroom learning.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Take detailed notes during lectures and review them daily.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Engage with peers to discuss and debate challenging concepts.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Stay organized by keeping all your study materials in one accessible place.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Review summaries of key topics regularly to reinforce your memory.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Practice problem-solving on a regular basis to build and maintain your skills.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Incorporate visual aids, such as charts and graphs, to better understand complex topics.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Set realistic and measurable goals for each study session to monitor your progress.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Experiment with different study techniques until you find the most effective ones for you.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Take regular breaks to prevent burnout and maintain long-term productivity.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Leverage study groups to gain new insights and collaborative support.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Practice writing concise summaries to encapsulate what you've learned.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Stay motivated by celebrating small milestones in your study progress.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Utilize both digital and physical note-taking methods for flexibility.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Keep your study space organized and free from distractions.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Regularly assess and adjust your study plan to ensure it meets your needs.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Prioritize your most challenging subjects first when your energy levels are highest.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Review your notes with a partner to gain a fresh perspective on difficult material.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Use online platforms for practice tests to benchmark your performance.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Maintain a steady pace in your studies and avoid last-minute cramming.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Combine theoretical learning with practical application to deepen your understanding.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Reflect on your learning after each session to identify improvements.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Stay curious and keep challenging yourself with new problems regularly.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Keep a record of difficult topics and review them until they become clear.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Develop a habit of summarizing your study sessions to reinforce retention.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Experiment with different learning modalities—visual, auditory, and kinesthetic—to see what works best.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Use mind mapping techniques to organize complex information visually.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Dedicate time each week for a comprehensive review of all challenging material.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Break your study goals into daily, manageable tasks for consistent progress.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Leverage study apps to keep your schedule organized and track your learning milestones.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Keep your study routine flexible to adapt to unexpected changes or opportunities.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Celebrate small wins to stay motivated throughout your study journey.",
            },
          ],
        },
        {
          title: "Strategies for Successful Internship Applications",
          main_post:
            "This thread is dedicated to sharing effective strategies and insights on crafting successful internship applications. Share your tips on resume tailoring, cover letter writing, networking, interview preparation, and how to stand out in a competitive field.",
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          replies: [
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Tailor your resume to highlight relevant skills for each internship application.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Customize your cover letter to match the company's culture and job requirements.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Leverage your network by reaching out to alumni for insights and referrals.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Research the company thoroughly before applying to understand their values.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Practice common interview questions and refine your answers.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Update your LinkedIn profile with your latest projects and experiences.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Showcase your achievements with quantifiable results in your resume.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Attend career fairs to connect with potential employers directly.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Seek feedback from mentors to improve your application materials.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Prepare a portfolio of your work if you're applying for technical roles.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Highlight any relevant coursework or certifications on your resume.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Consider including a personal project that demonstrates your passion.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Tailor your application for each role instead of sending generic submissions.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Join internship workshops to learn application strategies.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Practice mock interviews to build confidence and improve communication skills.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Follow up with a thank-you email after an interview to show appreciation.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Leverage online resources to learn about the latest trends in your field.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Demonstrate soft skills like teamwork and problem-solving in your application.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Keep your resume concise and focused on your most significant accomplishments.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Use action verbs and clear metrics to describe your responsibilities.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Show your adaptability by highlighting diverse experiences in your resume.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Participate in hackathons or coding challenges to strengthen your technical skills.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Create a professional email signature to enhance your communications.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Tailor your application documents for the specific role you're applying to.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Highlight internships or projects that are most relevant to the position.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Network actively on platforms like LinkedIn and attend industry events.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Consider reaching out directly to hiring managers with a personalized message.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Understand the internship programs and their selection process thoroughly.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Prepare a list of questions to ask during the interview to show your interest.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Keep track of your applications to follow up appropriately.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Utilize resume templates that are both modern and professional.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Include relevant keywords from the job description in your application.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Prepare a personal statement that reflects your passion and goals.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Showcase any certifications or training programs relevant to the industry.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Proofread your application documents multiple times to avoid mistakes.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Tailor your cover letter to explain how you can add value to the company.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Include specific examples of your problem-solving skills in your application.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Prepare a digital portfolio that showcases your work and projects.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Highlight any relevant research or technical projects that align with the internship.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Leverage your university's career services for resume reviews and mock interviews.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Develop a personal brand that reflects your professional aspirations.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Practice articulating your experiences clearly in both your resume and interviews.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Ensure your resume is concise yet informative, focusing on your key strengths.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Tailor your application narrative to reflect the unique requirements of each role.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Prepare answers for behavioral questions using the STAR method.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Keep your online profiles updated with your latest achievements.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Engage in networking events to expand your professional connections.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Prepare a list of thoughtful questions for interviews to demonstrate your interest.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Customize your resume for each application by emphasizing different strengths.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Keep a log of your application progress and follow up with employers when necessary.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Emphasize your cross-functional skills to show versatility.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Prepare your application well in advance to avoid last-minute rush and errors.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Reflect on past experiences to identify what makes you unique as a candidate.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Stay updated with industry trends to better tailor your application.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Always include a call-to-action in your cover letter to prompt further discussion.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Be sure to follow the application instructions carefully to avoid disqualification.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Showcase your ability to learn quickly by mentioning relevant coursework and projects.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Attend networking events and career fairs to build meaningful connections.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Highlight your part-time work or internships that demonstrate practical experience.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Keep your application materials concise, error-free, and well-organized.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Show enthusiasm for the role by conveying genuine interest in the company.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Practice your interview skills and be ready to discuss your projects in detail.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Leverage your university's resources for career advice and resume building.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Make sure to follow up with a thank-you note after interviews.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Highlight your leadership experiences to demonstrate initiative.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Keep a record of your networking contacts and maintain those relationships over time.",
            },
          ],
        },
        {
          title: "Balancing Research and Coursework Effectively",
          main_post:
            "This thread is dedicated to sharing strategies and tips on balancing research responsibilities with coursework effectively. Whether it's time management, setting priorities, or integrating research activities into your academic schedule, share your experiences and advice to help us all succeed.",
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          replies: [
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I create a detailed schedule that blocks out specific hours for research and coursework separately.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Prioritizing tasks based on deadlines helps me stay organized between my research projects and classes.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I allocate mornings for coursework and afternoons for research work to optimize my productivity.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Setting clear boundaries between lab time and class study time is key to balancing my workload.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Using a digital planner helps me juggle research deadlines and coursework assignments effectively.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I break my day into segments, dedicating specific blocks for research, classes, and breaks.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Integrating research discussions into coursework whenever possible saves me a lot of time.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Regular meetings with my advisor keep me on track with both research and coursework.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I set realistic goals for both my research and coursework on a weekly basis.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Time management apps are a lifesaver for balancing academic responsibilities.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I allocate weekends primarily for research while focusing on coursework during the week.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I always start my day by listing the most important tasks for both research and classes.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Regular review sessions help me keep up with both academic and research work.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I use the Pomodoro technique to maintain focus during long study sessions.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Sometimes I mix research tasks with coursework if the topics are related.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Allocating buffer time between research and coursework helps me manage unexpected delays.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I use a color-coded calendar to prioritize deadlines for both research and coursework.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Taking short breaks during study sessions allows me to refresh and maintain productivity.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I integrate my coursework with research by applying case studies from my projects.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Setting clear daily objectives helps me balance both academic and research demands.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I prepare my study plan the night before, listing out tasks for research and coursework.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Using project management tools helps me track progress on both fronts.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I allocate specific time slots for research writing and literature reviews.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Group discussions with peers often help me clarify complex research and coursework topics.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I maintain a balance by prioritizing tasks based on urgency and importance.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Balancing research and coursework is challenging, but a disciplined schedule makes it manageable.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I allocate mornings for intensive coursework and afternoons for research activities.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I plan my research tasks in parallel with my course projects to maximize efficiency.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I try to keep my weekends flexible to accommodate urgent research deadlines.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Regular advisor meetings help me align my research goals with coursework requirements.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I review my progress at the end of each week and adjust my schedule accordingly.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Setting aside time for leisure and exercise is crucial to avoid burnout.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I use study apps to help manage both my research reading and coursework assignments.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Reviewing research articles and summarizing them helps me integrate ideas with my coursework.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Breaking down large projects into smaller tasks makes everything more manageable.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I plan ahead for assignments and research deliverables to avoid last-minute stress.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I use the Eisenhower Matrix to prioritize tasks based on urgency and importance.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I set a realistic goal for each study session to keep both research and coursework on track.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I keep a daily log of tasks and review my productivity to make adjustments.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Combining structured planning with flexibility is the key to managing multiple responsibilities.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I review my calendar every morning to ensure no deadlines are missed.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Planning weekly goals has helped me maintain a consistent balance between research and coursework.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I set aside specific time each week for a comprehensive review of both research and class materials.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Using digital tools and physical planners together gives me the flexibility I need.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I try to keep my routine consistent, even when unexpected tasks come up.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I continuously adjust my study plan based on feedback and personal experience.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I keep track of all deadlines and set reminders to avoid last-minute rushes.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I try to blend research with coursework when topics overlap, which saves time.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I always reserve some time at the end of the day to reflect on my progress.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "A disciplined schedule has significantly improved my ability to balance research and coursework.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Regular check-ins with my mentor help me stay aligned with my goals.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I set short-term goals to build momentum and long-term goals for overall direction.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I maintain a balance by keeping a clear separation between work time and personal time.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I constantly review and refine my strategies to ensure I stay productive in both areas.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Using visual planners and digital calendars together helps me manage my tasks effectively.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I find that regular exercise and proper rest are essential for maintaining balance.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Balancing research and coursework effectively requires discipline, organization, and flexibility.",
            },
          ],
        },
      ],
    },
    {
      title: "Fall 2021 Course & Exam Updates",
      group: "batch",
      type: "announcement",
      threads: [
        {
          title: "Updated Exam Timetable for Fall Semester",
          main_post:
            "The new exam timetable for the fall semester has been released. Please review the updated schedule for changes in exam dates, times, and venues, and adjust your study plans accordingly.",
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          replies: [
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I reviewed the new timetable, and the exam dates are clearly laid out.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The updated schedule provides sufficient time for revision between exams.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I like how the timetable avoids any overlapping exam sessions.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The new exam timetable is well-organized and easy to follow.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The updated schedule gives a clear overview of all exam venues and timings.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "This revision has made it easier to plan my study sessions effectively.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I appreciate the detailed notes accompanying the new timetable.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The updated exam dates provide enough buffer time for revisions.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I have adjusted my study plan based on the clear new schedule.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The revised timetable resolves previous scheduling conflicts, which is great.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The clarity in the updated schedule really helps me manage my revision time.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I appreciate that the new timetable is released well in advance.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The updated exam schedule makes it easier to coordinate group study sessions.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I noticed a few changes in exam venues; I'll update my notes accordingly.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The new timetable offers a balanced distribution of exam days.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "This revised schedule allows adequate preparation time for each subject.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The timetable is clear, and the exam durations are appropriately set.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I like how the new schedule minimizes gaps between exams for more consistent study flow.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The update provides a precise timeline, making planning much easier.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The detailed breakdown of exam timings is very helpful for my study plan.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I have cross-checked the new schedule, and it seems well-structured.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The revised timetable ensures there are no conflicting exam sessions.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The update provides ample time for breaks between exams, which is great.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The new exam schedule is a major improvement over the previous version.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The updated timetable is very detailed, making it easy to track all exam dates.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The revised schedule has clearly defined exam periods, which is very helpful.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I appreciate the department's effort in releasing this updated exam timetable.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The new schedule helps in planning my revision sessions well ahead of time.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I have integrated the updated timetable into my digital calendar.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The changes in exam timings are clearly highlighted in the new schedule.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "This updated timetable provides a comprehensive overview of the exam period.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I found the revised exam timetable to be very user-friendly and detailed.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The new schedule offers clear instructions on exam locations and timings.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I appreciate that the updated timetable has resolved previous scheduling conflicts.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The revised schedule is well-structured, making exam planning much more straightforward.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I'm impressed by the clarity and precision of the updated exam timetable.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The timetable update allows for better coordination of study groups.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The new schedule is a useful guide for planning revisions and exam preparations.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I will adjust my study plan according to the revised exam dates and times.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The detailed exam timetable makes it easier to manage my revision schedule.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I find that the new timetable gives a clear snapshot of the entire exam period.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The updated schedule clearly outlines the duration of each exam.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I appreciate the prompt release of the updated exam timetable.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The new timetable is very well-organized, helping me plan my study time effectively.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I noticed that the updated schedule includes all necessary details for each exam.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The clarity in the new timetable will help avoid any last-minute confusion.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "This revised exam timetable is a significant improvement over the last one.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I find the update very timely and helpful for planning my revision schedule.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The new timetable clearly indicates exam durations, which helps in planning my breaks.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I have integrated the updated exam schedule into my calendar app for easy reference.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The clarity and precision of the new timetable are very reassuring.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I appreciate that the updated schedule covers all exam sessions without overlaps.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "This revised exam timetable makes it easier to allocate time for each subject.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I will be using this new schedule to adjust my study plan accordingly.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The detailed structure of the updated exam timetable is very helpful.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I have noticed several improvements in the new exam schedule that make it more user-friendly.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The revised timetable offers a comprehensive view of all upcoming exam dates and times.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I'm impressed by how detailed the new exam timetable is, covering all relevant aspects.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "This updated schedule provides a clear timeline that helps me organize my study sessions.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I appreciate the thoroughness of the new exam timetable—it leaves no room for confusion.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The updated schedule is a useful tool to track all exam-related commitments.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I have marked all the exam dates from the new timetable on my planner.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The updated exam timetable is very detailed, ensuring all sessions are clearly outlined.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "This new timetable is exactly what we needed to manage our study schedules more effectively.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I appreciate the clarity provided by the revised exam schedule—it’s very well-structured.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The new exam timetable allows me to plan my revision time more efficiently.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I noticed that the revised timetable includes extra buffer time between exams, which is great.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The updated exam schedule is comprehensive and provides clear guidance for planning.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I will adjust my study plans according to the clear and precise new exam timetable.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The revised schedule has significantly improved clarity over the previous version.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I'm grateful for the updated exam timetable; it has made planning my revision much easier.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The clear structure of the new schedule helps me avoid any last-minute rushes.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "This timetable update is a major help in managing my overall academic workload.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The new exam schedule provides a precise timeline that I can easily follow.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I appreciate the thorough update that has been provided in the revised exam timetable.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The revised timetable clearly outlines the duration of each exam, which helps me plan breaks effectively.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The new exam timetable is a reliable reference for scheduling my study sessions.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I'm impressed by how well the updated timetable organizes all the exam details.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "This comprehensive update on exam dates and times is very helpful.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I have integrated the revised exam timetable into my planning app with ease.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The clarity of the new schedule is evident, making it easier to track all exam sessions.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I appreciate the effort put into ensuring that there are no overlaps in the updated exam timetable.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The detailed exam schedule helps me allocate enough revision time for each subject.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The updated timetable is a significant improvement, making exam planning much simpler.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I find the new exam schedule very clear and organized, which is a big plus.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I will make sure to follow the revised timetable closely for my exam preparations.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The precision and clarity of the updated exam timetable are very reassuring.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I appreciate the new timetable—it provides a clear roadmap for the exam period.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The updated exam schedule is well-structured, making it easy to plan my revision sessions.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The revised timetable has been very helpful in ensuring I know exactly when each exam is scheduled.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I will adjust my study plan based on the new exam dates and times provided.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The clarity and organization of the updated timetable are exactly what we needed.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I find the detailed layout of the new exam timetable very user-friendly.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The updated exam schedule is comprehensive and makes planning much easier.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "This new timetable provides a clear overview of all exam periods and breaks.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I appreciate the effort to update the exam schedule with such clarity and detail.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The revised timetable helps me plan my study sessions effectively without any confusion.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I am satisfied with the detailed layout of the new exam timetable.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The clarity in the updated schedule is very reassuring for my exam preparations.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I have adjusted my study plan to align with the new exam dates effectively.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The updated exam timetable is a great tool for managing my academic commitments.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I appreciate the precision and clear instructions in the revised exam schedule.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "This updated timetable makes it easier to see the entire exam schedule at a glance.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The revised exam schedule is well-organized, and I’m confident in planning my revision.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The new timetable is detailed enough to allow for proper revision breaks between exams.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I'm impressed by the comprehensive information provided in the updated exam timetable.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "This revision is a significant improvement over the previous exam schedule.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The updated exam timetable clearly indicates all the necessary details for each exam.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I appreciate the clear communication of exam times and venues in the new timetable.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The new schedule helps me manage my study time better, and I'm grateful for the update.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The precise layout of the updated exam timetable makes it very user-friendly.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "This new exam timetable is a crucial resource for planning my exam preparations.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I find the revised timetable very clear and effective in organizing exam dates.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The update provides a robust framework for all exam scheduling, which is very helpful.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The new exam timetable is a comprehensive guide to all the upcoming exams.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I appreciate the detailed structure of the updated schedule; it really helps with my planning.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The revised exam timetable has been very useful in avoiding scheduling conflicts.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I am impressed by the organization and clarity of the new exam schedule.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "This updated timetable offers a clear, user-friendly overview of all exams.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The new schedule is a significant improvement, making my exam preparation smoother.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The revised timetable's precision has greatly reduced my exam scheduling stress.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I have integrated the new exam timetable into my planning tools seamlessly.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I find the updated schedule to be very comprehensive, covering all exam details.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The clarity and organization of the new exam timetable are very reassuring.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "This timetable update is exactly what we needed to plan our revision sessions effectively.",
            },
          ],
        },
        {
          title: "Course Registration Deadline Approaching",
          main_post:
            "The course registration deadline is rapidly approaching. Please review your course selections and complete your registration as soon as possible to secure your preferred classes and ensure a smooth academic schedule.",
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          replies: [
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The course registration deadline is fast approaching. Don't miss your chance to enroll in your preferred classes.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I just checked my registration status; I need to update my course selections soon.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Make sure to complete your registration before the deadline to secure your schedule.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Time is running out! Double-check your course plan and register as soon as possible.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I received an email reminder about the registration deadline. It’s coming up very soon.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Don't wait until the last minute to register; some courses fill up quickly.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Has anyone finalized their course selection? The deadline is almost here.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I need to check if my desired courses still have seats available before the deadline.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The deadline for registration is really close. Hurry up and complete your enrollment!",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I am planning to register tonight. How many of you have completed your registration?",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I just updated my course list. Make sure to review your selections before the deadline.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Time is of the essence! Confirm your registration before the system closes.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Double-check prerequisites for your courses before finalizing your registration.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Make sure to update your course preferences if there are any changes.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The deadline for registration is fast approaching. Act now to secure your schedule!",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I appreciate the early reminders; I plan to register as soon as possible.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I’m updating my course list right now, and the deadline is almost here.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The registration portal is user-friendly, so it's a good time to finalize your course selections.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I have a suggestion: set aside a dedicated time to complete your registration without distractions.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I will finish my registration by tonight and encourage everyone to do the same.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I always check my registration status early to avoid any last-minute issues.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Please review your selected courses carefully before submitting your registration.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I recommend verifying your schedule one more time to ensure there are no conflicts.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The registration deadline is non-negotiable; please complete your enrollment soon.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I am double-checking all my prerequisites to ensure a smooth registration process.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The updated portal shows all courses clearly; it's time to register!",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I appreciate the system updates that make course selection easier.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Don't forget to print or save your registration confirmation after completing the process.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I have verified my schedule, and I'm confident in my course choices.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The registration deadline is near, so act quickly to secure your courses.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I'm updating my registration details now to reflect some changes in my plan.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I appreciate that the registration portal provides clear exam dates along with course details.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I checked the portal, and all my desired courses are still available.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The clear layout of the new timetable is helping me plan my study schedule too.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I appreciate the detailed instructions on the registration portal; it's very helpful.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I plan to finalize my registration tonight and encourage everyone to do so.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I always set a reminder to check the portal at least twice before the deadline.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The registration deadline update is timely; it's a good reminder to get things done.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I've already completed my registration and feel relieved about it.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I just submitted my course selections; now I can focus on my exam preparations.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The deadline reminder has prompted me to verify my registration details one last time.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I appreciate the user-friendly design of the updated registration system.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The updated exam timetable in the portal is very clear and detailed.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I've confirmed that all my course details are accurate in the new timetable.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The clarity of the updated registration portal really helps reduce last-minute confusion.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I am grateful for the detailed and clear registration update provided by the department.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The new timetable and registration details are a major improvement from last semester.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I will adjust my study plan according to the new course registration deadline.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The registration deadline update is very helpful for planning my revision schedule.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I find the new registration schedule user-friendly and easy to navigate.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Make sure to register soon to avoid any last-minute issues with course availability.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The clarity in the updated exam timetable is very reassuring for my study plans.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I appreciate the precision of the new course registration details; it's very clear.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I am planning to complete my registration well before the deadline to secure my classes.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The new timetable makes it easier to manage both course selections and study time.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I have saved a copy of the updated registration schedule for future reference.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I appreciate the effort put into making the registration process more efficient.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The updated registration portal is intuitive and very helpful.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I will review my course selections one more time before final submission.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I’m glad to see that the new timetable addresses previous scheduling issues.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The clarity of the new exam schedule is exactly what I needed to plan my revision.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I'm satisfied with the detailed layout of the updated registration schedule.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "This updated timetable is a game-changer for organizing my study schedule around exams.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The registration update provides all the necessary details for a smooth process.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I appreciate the regular updates on the registration process and timetable.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The new schedule has helped me plan my day better with clear exam periods.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The update is comprehensive and has resolved previous ambiguities in the exam schedule.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I have integrated the updated exam timetable into my planner with ease.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The revised registration schedule is a solid foundation for planning my academic term.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I'm confident the new timetable will help me manage my course load effectively.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "This update is a significant improvement over the previous exam schedule, and it's very helpful.",
            },
          ],
        },
        {
          title: "Scholarship Application Updates",
          main_post:
            "The latest scholarship application updates have been released. Please review the new deadlines, eligibility criteria, and document requirements. All students are encouraged to check the updated guidelines carefully and adjust their applications accordingly to ensure they meet all the new standards.",
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          replies: [
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I have reviewed the updated scholarship guidelines and they seem comprehensive.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The new deadlines are tighter, so I need to finalize my documents soon.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The eligibility criteria have been updated; please double-check your GPA requirements.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The scholarship application update includes additional document requirements.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I appreciate the clarity provided in the updated scholarship guidelines.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Make sure to update your personal statement to reflect the new criteria.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The deadline extension gives us more time to perfect our applications.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I plan to gather all required recommendation letters as per the new guidelines.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The update mentions a new emphasis on extracurricular achievements.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I noticed that the scholarship update requires a revised essay prompt response.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The revised guidelines seem more competitive; I'll work harder on my application.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I'm planning to attend the scholarship info session for further details.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The update has clarified the process for submitting additional documents.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I will review my transcript to ensure it meets the new eligibility requirements.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The new scholarship update has made me reconsider my application strategy.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I appreciate the department's effort in providing detailed updates on scholarship applications.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The guidelines now require an updated resume, which I am currently revising.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I have noted the new deadline; it's approaching quickly so I must act fast.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The update also emphasizes the importance of a strong cover letter.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I plan to reach out to my advisor for advice on meeting the new criteria.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The scholarship update highlights additional financial aid opportunities.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I noticed that some scholarships now require an interview component.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The updated application process is more rigorous, but it ensures fairness.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I am working on enhancing my portfolio to align with the new scholarship requirements.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The scholarship update suggests including a detailed project summary.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I will update my academic achievements in my application as per the new guidelines.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The revised guidelines indicate that leadership experience is now a key factor.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I plan to attend the upcoming scholarship workshop to gain more insights.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The update provides a checklist for required documents, which is very helpful.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I have already started preparing my application materials based on the new update.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The scholarship update is a good reminder to keep our documents organized.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I appreciate the clear instructions provided in the scholarship update.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Double-check the new deadlines; they are non-negotiable.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I will consult with my mentor to ensure my application meets the updated criteria.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The update has clarified many aspects of the application process that were previously ambiguous.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I am adjusting my timeline to accommodate the new scholarship deadlines.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The scholarship application update has motivated me to improve my academic profile.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I plan to revise my personal statement to better reflect my achievements.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The update emphasizes the importance of extracurricular involvement.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I will update my recommendation letters to reflect recent accomplishments.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The scholarship update is a valuable resource for all applicants this year.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I appreciate the effort put into providing detailed scholarship information.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The update clearly states the new deadlines, so make sure to note them down.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I will ensure that my application materials are updated according to the new criteria.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The revised guidelines make it clear what additional documents are needed.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I plan to focus on highlighting my leadership experiences in my application.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I will tailor my cover letter to explain how I can add value to the scholarship committee.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I'll include specific examples of my achievements to demonstrate my capabilities.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I plan to prepare a digital portfolio that showcases my academic and extracurricular work.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I will highlight my research projects and technical skills in my updated resume.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I'll leverage my university's career services for additional resume reviews and mock interviews.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I will network actively on LinkedIn to connect with potential scholarship sponsors.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I plan to share any updates I receive from the scholarship committee with my peers.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I'll review feedback from previous applications to improve my current submission.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I am working on refining my personal statement to better reflect my experiences.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I will ensure my application is concise, well-organized, and error-free.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I plan to highlight any internships or part-time work that demonstrate my practical experience.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I will tailor my application for each scholarship to emphasize the most relevant strengths.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I appreciate the detailed FAQ provided in the update; it cleared many of my doubts.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I plan to submit my application well before the deadline to avoid any last-minute issues.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I have adjusted my study plan to include time for finalizing my scholarship application.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I will update my resume and cover letter immediately to meet the new guidelines.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I'm confident that with these updates, my scholarship application will be much stronger.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The clear instructions in the update have really helped me streamline my application process.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I appreciate the transparency of the new scholarship application process.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I will keep my peers updated with any further changes from the scholarship committee.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The revised guidelines have set a higher standard for scholarship applications, which is motivating.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I'm excited about the new opportunities and will work hard to submit a strong application.",
            },
          ],
        },
        {
          title: "New Grading Policy Announcement",
          main_post:
            "The new grading policy has been officially announced. Please review the updated guidelines that detail changes in evaluation criteria, the weightage of assignments, and the final grade calculation process. It is essential for all students to familiarize themselves with these updates as they will significantly impact how your academic performance is assessed.",
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          replies: [
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The new grading policy is clear and seems to be more transparent.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I appreciate the detailed breakdown of each assessment component.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The updated criteria for assignments and exams are fairer than before.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I noticed the new policy emphasizes continuous assessment, which is a positive change.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The announcement has clarified the process for grade recalculations in case of discrepancies.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I have updated my study plan based on the new grading weightage.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The new grading policy appears more holistic and comprehensive.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I appreciate the inclusion of extra credit opportunities in the new guidelines.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The revised policy provides a clear rubric for how final grades will be computed.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I am reviewing the new grading criteria and it seems to be very fair.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The updated policy clearly outlines how participation and assignments are weighted.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I find the revised guidelines more student-friendly compared to the old system.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The clear breakdown in the new grading policy will help reduce ambiguity.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I plan to discuss the new grading policy in my next study group meeting.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The policy update explains how late submissions will be handled, which is very helpful.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I appreciate that the new policy gives us a chance to appeal our grades if necessary.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The updated guidelines have made the evaluation process much more transparent.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I'm adjusting my study strategy to align with the new grading policy.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The update emphasizes continuous performance, which motivates me to work consistently.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I find the revised grading criteria to be more balanced than the previous system.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The new guidelines include a detailed rubric for lab work and projects.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I appreciate that the update covers how extra credit is factored into final grades.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The announcement has clarified the timeline for grade submissions and recalculations.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The updated policy provides clear guidelines on how to handle incomplete assessments.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I am satisfied with the transparency of the new grading system.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The detailed breakdown in the update makes it easier to understand our performance metrics.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I plan to review my grades under the new policy and discuss any discrepancies with my professor.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The new grading policy seems to encourage continuous improvement throughout the semester.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I appreciate the effort to standardize the grading process with clear benchmarks.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The revised policy has prompted me to reassess my study habits and focus areas.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The update also explains how class participation is factored into our final grades.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I have already begun adjusting my coursework to align with the new guidelines.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The policy update gives us a clearer picture of how our performance will be assessed.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I'm pleased that the new guidelines are more detailed and transparent.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I will follow up with my advisor to clarify some points in the updated grading policy.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The clear rubric in the update makes it easier to understand what is expected from us.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I'm updating my study plan based on the new grading criteria provided in the update.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The revised guidelines ensure a fairer evaluation of both theory and practical work.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I appreciate that the updated policy offers clear instructions for addressing grade discrepancies.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I have noted the new policy's emphasis on continuous assessment and participation.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The announcement clarifies that all regrading requests must be submitted within two weeks.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The updated guidelines indicate a more comprehensive approach to final grade calculation.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I will carefully review the grading rubric to understand how each component is weighted.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The new policy update has been very well-received among my peers.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I'm considering discussing the new guidelines in our next class to get further clarification.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The updated policy includes provisions for extra credit, which is a welcome addition.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I believe the new grading policy will help motivate continuous academic effort.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The clarity in the grading criteria gives me confidence in the fairness of the evaluation process.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I'm grateful for the transparency provided in the new grading policy update.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The detailed explanation in the announcement has made the new policy easy to understand.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I will be adjusting my study and project strategies based on the updated grading guidelines.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The new grading policy update is a significant improvement over the previous system.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I plan to share this updated policy with my study group to ensure everyone is informed.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The announcement has addressed many concerns about the previous grading ambiguities.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I am now more confident in how my performance will be evaluated under the new guidelines.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The revised policy also offers clear instructions on how to appeal if there are any issues.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I will be discussing these changes with my academic advisor for further insights.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The updated grading criteria appear to be more aligned with current academic standards.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I appreciate that the new policy takes into account both continuous assessment and final exams.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I find the extra credit provisions in the updated policy particularly encouraging.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The clarity in the new grading guidelines will help me plan my study schedule better.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I have shared the updated policy with my classmates, and it has sparked a positive discussion.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I appreciate the detailed breakdown of the grading components in the new policy.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The new guidelines clearly define how participation and assignments contribute to the final grade.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The updated policy provides a transparent framework for evaluating our academic performance.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I will be using the new grading rubric to self-assess my progress in each course.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The detailed policy update is very reassuring and shows a commitment to fairness.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I have integrated the new grading criteria into my academic planning and study strategy.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The revised policy is a significant improvement that reflects our academic efforts more accurately.",
            },
          ],
        },
      ],
    },
    {
      title: "CS Research & Curriculum Bulletin",
      group: "department",
      type: "announcement",
      threads: [
        {
          title: "New Research Grant Opportunities in CS",
          main_post:
            "The department has announced new research grant opportunities in the field of Computer Science. These grants cover diverse areas such as artificial intelligence, cybersecurity, quantum computing, and distributed systems. Faculty and students with innovative project ideas are encouraged to review the guidelines and submit their proposals before the deadline. This is a great chance to secure funding for cutting-edge research.",
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          replies: [
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The new research grants offer a fantastic opportunity to fund innovative projects in AI.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I plan to submit a proposal on cybersecurity enhancements using advanced machine learning techniques.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "These funding opportunities could be a game-changer for interdisciplinary research in CS.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I appreciate the detailed guidelines provided for the grant application process.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The announcement has sparked interest among many researchers in our department.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I am considering a project proposal on quantum computing applications.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The deadlines seem reasonable; I’ll start working on my proposal immediately.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "This grant could help fund my research on distributed systems optimization.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I'm excited about the possibility of exploring new AI algorithms with this funding.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The application process appears straightforward, which is very encouraging.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I plan to discuss my research idea with my advisor to refine my proposal.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The grant announcement highlights opportunities in both theoretical and applied CS research.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I'm interested in applying for a grant to support my project on machine learning optimization.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "These research grants are a great way to boost our department’s research output.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I’m considering a proposal that explores blockchain integration in cybersecurity.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The funding criteria are well explained, which makes the application process transparent.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I am preparing my application and will incorporate recent research findings in my field.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "These opportunities could help bridge the gap between theory and practical applications in CS.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I look forward to collaborating with peers on a joint proposal for a research project.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The grant could significantly enhance our research on AI ethics and bias mitigation.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I’m excited about the potential to secure funding for a project in quantum computing.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "This is a golden opportunity for those of us working on next-generation CS research.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I plan to attend the information session to learn more about the application details.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "These grants are competitive, so it’s important to present a strong proposal.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The announcement has given me new ideas for potential research projects.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I am motivated to improve my proposal based on the detailed criteria mentioned.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The new research grants could help fund innovative projects in cybersecurity.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I appreciate the emphasis on interdisciplinary projects in the grant announcement.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "This funding opportunity could be pivotal for my research in data science.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I plan to collaborate with colleagues to submit a joint proposal for distributed systems research.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The updated guidelines clearly specify the evaluation criteria for the proposals.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I am excited to leverage these grants to further my work in natural language processing.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The opportunity to secure funding for quantum computing research is very appealing.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I am gathering my research data and publications to strengthen my application.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The funding could provide the resources needed for advanced computational experiments.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I'm excited about applying for a grant focused on innovative AI algorithms.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "These grants will encourage more collaborative research within the department.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The proposal guidelines are detailed and provide a clear framework for submission.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I plan to focus on a project proposal that integrates machine learning and cybersecurity.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The new grant opportunities are a boost for those of us pursuing innovative CS research.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I will be revising my research proposal to align with the new funding priorities.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The opportunity to secure funding for projects in distributed computing is very promising.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I'm brainstorming ideas for a proposal that explores novel applications of AI.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "These research grants are a great incentive for us to push the boundaries of our work.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I plan to submit my application soon and will share tips once it's ready.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The announcement motivates me to refine my project idea and proposal draft.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I appreciate the transparency in the selection criteria outlined in the update.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The new grant opportunities can significantly enhance our research capabilities.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I will coordinate with my research group to develop a strong proposal for this funding.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "This funding will help cover the costs of advanced computational resources.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I am excited to see how these new grants will impact our ongoing research projects.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The clear guidelines in the update make it easier to prepare a comprehensive proposal.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I will attend the grant information session to gather more insights into the process.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "This announcement is a great reminder to update my research portfolio with recent publications.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The opportunity to secure a research grant is very exciting for my project on AI ethics.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I am gathering all necessary documents to ensure my proposal meets the updated requirements.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The grant announcement encourages me to think more creatively about my research ideas.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I look forward to discussing potential collaborative projects with colleagues for these grants.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "These research grants offer a chance to explore uncharted territories in CS research.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I will refine my proposal based on the feedback from previous submissions.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The announcement provides a solid foundation for planning innovative research projects.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I appreciate that the update emphasizes both theoretical and applied research in CS.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "This funding opportunity will be a catalyst for many groundbreaking projects.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I am excited to see the new research grant opportunities stimulate innovation in our department.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The detailed criteria in the update are very helpful for crafting a strong proposal.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I plan to incorporate recent research trends in my proposal to make it more competitive.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "This announcement is a great opportunity for those of us seeking to expand our research scope.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I'm excited to leverage these grants to fund innovative projects in machine learning.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The update clearly outlines the steps for submitting a successful research proposal.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I will be discussing potential project ideas with my research team based on this announcement.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "These grants provide a fantastic opportunity to secure funding for innovative CS projects.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I appreciate the clear deadlines and criteria provided in the research grant update.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "This funding will enable many of us to push the boundaries of our research work.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I'm inspired by the opportunity to work on cutting-edge research with these grants.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The grant announcement motivates me to explore new research directions in CS.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I will update my research proposal soon to incorporate these new funding opportunities.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "These research grants are exactly what our department needs to fuel innovation.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I plan to collaborate with other departments on a proposal that leverages interdisciplinary research.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The update provides all the necessary details for preparing a competitive proposal.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I appreciate the clear focus on both theoretical and applied research opportunities.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "This is a great opportunity to secure funding for innovative projects in emerging areas.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The new research grant announcement is very encouraging for all researchers in CS.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I'm excited to see the potential impact of these grants on future projects.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The updated guidelines make the application process transparent and manageable.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I will refine my proposal to highlight its innovative aspects in light of the new criteria.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "This announcement is a reminder to all of us to push for excellence in our research projects.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The detailed criteria and deadlines are very helpful in planning my proposal submission.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I'm looking forward to seeing the impact of these new research grants on our department.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "These opportunities will allow us to explore new frontiers in computer science research.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I am excited to leverage this funding to enhance my research on neural networks.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I plan to integrate these grant opportunities into my long-term research strategy.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "This announcement has given me a clear roadmap for applying for research funding.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The research grant opportunities are a much-needed boost for our innovative projects.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I will coordinate with my team to prepare a strong proposal for the upcoming grant cycle.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I appreciate the detailed instructions that help us understand the application process.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The clarity of the guidelines gives me confidence in submitting a competitive proposal.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I will be sharing my proposal draft with my colleagues for feedback.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "This funding opportunity could significantly impact the future of CS research in our department.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I plan to apply for the grant focusing on advanced algorithms for data security.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The announcement encourages us to think creatively about interdisciplinary research projects.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I am motivated to pursue new research ideas after reading the updated guidelines.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "These grants will provide the resources needed to conduct high-quality CS research.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I appreciate the effort the department has put into securing these new funding opportunities.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I will update my research proposal to reflect the priorities outlined in the announcement.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "This funding can be a turning point for ambitious research projects in our field.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I'm excited to collaborate with faculty and students on innovative research proposals.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The detailed criteria in the announcement help us focus our proposal ideas effectively.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I plan to discuss the grant opportunities in our next departmental meeting for further insights.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I am considering a proposal that integrates AI with cybersecurity, leveraging these grants.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "These research grants are a fantastic opportunity to elevate our department’s research profile.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I will refine my project outline and start drafting my proposal immediately.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "This funding announcement is very encouraging and aligns with my research interests.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I appreciate the opportunity these grants provide to pursue innovative research in CS.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The announcement has motivated me to explore new research directions in my field.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I'm excited to see how these grants will help drive innovation in our upcoming projects.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "This update is a clear call to action for all researchers in our department to submit high-quality proposals.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I plan to collaborate with peers to strengthen our proposal and make it more competitive.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The announcement is very detailed and gives us a comprehensive guide on the application process.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I will be using the updated guidelines to enhance the structure and content of my research proposal.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The new grant opportunities are an excellent way to secure funding for ambitious CS research projects.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I appreciate the transparency and clarity of the new research grant announcement.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I’m inspired by the potential impact these grants could have on our research efforts.",
            },
          ],
        },
        {
          title: "Curriculum Revision for Next Semester",
          main_post:
            "The curriculum for next semester has been revised with input from faculty and student feedback. The new structure includes updated course requirements, a revised credit distribution, and the introduction of several new electives designed to better align with industry needs. Please review these changes carefully and reach out with any questions or concerns to ensure you understand how the updates will affect your academic plan.",
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          replies: [
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The new curriculum revision seems well-structured and promising.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I appreciate the updated course offerings and clear guidelines.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The changes in credit distribution look balanced and fair.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I have reviewed the revised curriculum, and it addresses key academic needs.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The introduction of industry-focused courses is a significant improvement.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I'm curious about how the new electives will affect my major requirements.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The revision provides more flexibility for interdisciplinary studies.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I appreciate that student feedback was incorporated into the revision.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The addition of new courses in data science and AI is exciting.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The revised curriculum aligns well with current industry trends.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I noticed improvements in the balance between core and elective courses.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The new curriculum offers a better learning pathway for students.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I'm impressed by the clarity of the new course requirements.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The revision should help us gain more practical skills through updated lab sessions.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The updated syllabus includes more opportunities for hands-on projects.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The new curriculum emphasizes critical thinking and innovation.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I am looking forward to the new electives, especially those focusing on emerging technologies.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The update provides a comprehensive guide to the new academic structure.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I appreciate the detailed explanation of each course change.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The revised curriculum will likely enhance our overall learning experience.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I believe the new structure will benefit both students and faculty.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The revised course list offers more specialization options in my field.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I'm excited about the potential for interdisciplinary courses in the new curriculum.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The changes reflect a modern approach to computer science education.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I am looking forward to discussing these revisions with my academic advisor.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The new curriculum appears to be more aligned with industry demands.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I appreciate the inclusion of project-based learning in the revision.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The updated curriculum offers clear pathways for specialization.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I have reviewed the changes, and they seem to address previous shortcomings.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The curriculum revision introduces a more coherent course progression.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I am intrigued by the new elective options introduced in the revision.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The update provides a comprehensive view of the new academic structure.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I noticed a greater emphasis on research-oriented courses in the revision.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The new curriculum offers a better balance between theory and practice.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I am excited about the opportunities for collaborative projects under the new system.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The revision includes more flexible learning options for students.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I appreciate the transparency in the changes made to the course requirements.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The new structure seems designed to enhance both learning and research capabilities.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I am impressed by the strategic approach to curriculum revision presented.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The updated course structure will help in better academic planning.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The revision includes more options for elective courses, which is great.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I believe the curriculum changes will improve our academic performance overall.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The revised structure makes it easier to plan for graduation and future studies.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I find the new curriculum to be more aligned with global standards in CS education.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The update emphasizes both theoretical knowledge and practical application.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I am optimistic that the revised curriculum will enhance our learning experience.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The detailed course descriptions in the update have been very informative.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I appreciate the transparency and thoroughness of the curriculum revision process.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The new curriculum offers clear benchmarks for academic success.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I plan to review the updated guidelines in detail to ensure I meet all requirements.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The revision is well-documented and provides a clear roadmap for the next semester.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I find the new curriculum to be more aligned with current industry trends.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The updated curriculum revision is a significant improvement over the previous system.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I will be discussing these changes with my study group to get more insights.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The revision provides a detailed breakdown of changes in each subject area.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I appreciate that the new curriculum includes more opportunities for research.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I'm excited about the new electives and the flexibility they offer.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The curriculum revision update is comprehensive and clearly communicated.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I will update my academic plan based on these new curriculum changes.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The new course requirements and electives seem to offer a more balanced academic experience.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I'm looking forward to the positive impact this revision will have on our education.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The updated curriculum is a positive change that will better prepare us for the future.",
            },
          ],
        },
        {
          title: "Upcoming Graduate Seminar: Innovations in CS",
          main_post:
            "This thread is dedicated to the upcoming graduate seminar on Innovations in CS. Join the discussion to share your insights on breakthrough research, cutting-edge technologies, and innovative ideas presented during the seminar. Let's discuss how these advances will shape the future of computer science.",
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          replies: [
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The seminar on deep learning innovations was extremely enlightening.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I really appreciated the insights on quantum computing applications.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The discussion on AI ethics was thought-provoking and relevant.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The session on neuromorphic computing provided fascinating perspectives.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I found the practical examples in the seminar very useful.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The integration of interdisciplinary research was clearly showcased.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The insights on federated learning were innovative and well-presented.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I particularly enjoyed the segment on emerging cybersecurity trends.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The seminar's case studies really helped me understand the applications of AI.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The discussion on scalable distributed systems was very insightful.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I found the session on optimization algorithms for AI quite impressive.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The speaker’s points on ethical AI and bias mitigation were very relevant.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The seminar highlighted some groundbreaking techniques in natural language processing.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I appreciated the detailed explanation of transfer learning strategies.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The presentation on graph neural networks was particularly innovative.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I enjoyed the segment on self-supervised learning and its impact on data efficiency.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The seminar provided a great overview of current trends in AI research.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I found the integration of theory and practical application particularly useful.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The ideas on using neural architecture search were very inspiring.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The session on data-centric AI provided new insights into improving datasets.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I was impressed by the discussion on multimodal learning techniques.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The seminar's focus on optimization for large-scale models was very timely.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I learned a lot about the challenges of implementing scalable AI solutions.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The session on reinforcement learning for robotics was highly informative.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I appreciated the detailed case studies on industry collaborations in CS.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The seminar provided practical examples that I can apply to my research.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The innovative approaches to quantum computing were particularly striking.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I found the discussion on blockchain applications in CS very forward-thinking.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The seminar's exploration of AI in healthcare opened up new possibilities for me.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The speaker’s insights on data privacy in federated learning were very useful.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I appreciated the emphasis on continuous learning in the AI domain.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The seminar effectively highlighted the challenges of deploying AI at scale.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I enjoyed the presentation on advancements in computer vision and imaging.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The discussion on adaptive learning algorithms was quite enlightening.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The seminar offered great insights into integrating AI with real-world applications.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I found the exploration of explainable AI frameworks very beneficial.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The focus on interdisciplinary research in the seminar was very impressive.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I appreciated the session on emerging trends in machine learning optimization.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The ideas on leveraging cloud computing for AI research were very compelling.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The seminar provided a clear roadmap for future research directions in CS.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I found the integration of AI with IoT devices particularly innovative.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The discussion on minimizing bias in AI systems was very impactful.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I appreciated the detailed analysis of deep neural network architectures.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The session on meta-learning provided useful strategies for rapid adaptation.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I enjoyed the case studies presented on the practical applications of AI.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The seminar's focus on sustainable AI practices was very forward-thinking.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I found the panel discussion on interdisciplinary research very enriching.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The seminar emphasized the need for robust AI models, which resonated with me.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I appreciated the technical depth provided in the discussion on neural network optimizations.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The presentation on future research trends in CS was both insightful and inspiring.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I found the detailed case studies on AI applications to be very educational.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The seminar's emphasis on ethical considerations in AI was crucial.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I appreciated the clarity in the explanations of advanced AI techniques.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The insights on optimizing training processes for deep learning were particularly useful.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I enjoyed the interactive Q&A session that followed the presentations.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The seminar offered a great balance between theoretical concepts and practical applications.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I found the discussion on integrating computer vision with NLP very intriguing.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The innovative approaches to leveraging cloud resources for AI research were well presented.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I appreciated the focus on developing robust and scalable AI models.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The session on data-driven AI provided several actionable insights.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The seminar's coverage of emerging trends in unsupervised learning was excellent.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I found the practical examples on reinforcement learning quite motivating.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The insights on optimizing distributed AI systems were particularly relevant.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I appreciate the seminar's exploration of innovative AI hardware solutions.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The discussion on leveraging big data for AI advancements was very insightful.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I enjoyed the session on hybrid models combining symbolic and statistical methods.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The innovative presentation on model compression techniques was very informative.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I appreciated the detailed discussion on adaptive learning rate optimization.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The seminar highlighted several future trends that are set to redefine the field.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I found the session on AI in healthcare applications particularly relevant.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The speaker’s insights on ethical AI were both inspiring and necessary.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The seminar has sparked many ideas for my upcoming research projects.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I’m excited about the new approaches discussed for improving AI model efficiency.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The integration of AI with IoT was one of the most innovative parts of the seminar.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I found the practical applications of deep learning to be very compelling.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The discussion on real-time data processing in AI was very informative.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I appreciated the clear explanation of emerging trends in unsupervised learning.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The session on AI-driven automation was particularly insightful.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I enjoyed the interactive Q&A session that followed the presentations.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The seminar provided a wealth of resources for further reading on AI innovations.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I found the segment on graph neural networks particularly relevant to my research.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The speaker’s insights on AI scalability were very eye-opening.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I appreciate the thorough review of current AI challenges presented today.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The seminar’s focus on innovation is driving new ideas for my thesis work.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I found the breakdown of advanced AI concepts very accessible and clear.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The discussion on ethical implications of AI was very timely and important.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I’m excited to explore more about the applications of hybrid AI models discussed.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The seminar provided a strong foundation for understanding future AI trends.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I plan to incorporate some of these innovative ideas into my current research.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The detailed case studies really helped illustrate the potential of new AI technologies.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I appreciated the emphasis on research ethics and responsible AI development.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The seminar provided many actionable insights for advancing CS research.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The presentation on multi-agent systems in AI was innovative and engaging.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I found the session on optimizing neural networks very valuable.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The seminar gave a clear view of the current challenges in AI scalability.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I’m motivated by the innovative approaches to AI discussed today.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The Q&A session answered many of my questions about advanced AI techniques.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I look forward to applying these innovative concepts in my future projects.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The seminar has opened my eyes to new possibilities in computer science research.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: " I am excited to see how these innovations will shape the future of our field.",
            },
          ],
        },
        {
          title: "Upcoming Graduate Seminar: Innovations in CS",
          main_post:
            "Join us for the upcoming Graduate Seminar on Innovations in CS where leading researchers and industry experts will discuss the latest breakthroughs in computer science. Topics include deep learning advancements, quantum computing, neuromorphic architectures, federated learning, and more. This seminar promises to be an engaging forum for discussion, collaboration, and inspiration.",
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          replies: [
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The keynote on deep learning innovations was absolutely inspiring.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I found the discussion on quantum computing applications extremely insightful.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The session on neuromorphic architectures opened up a new perspective on hardware design.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I appreciated the deep dive into federated learning as a privacy-preserving technique.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The talk on explainable AI was particularly thought-provoking.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I loved the interactive Q&A session after the keynote—it clarified many doubts.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The examples of real-world applications of advanced algorithms were very relevant.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I’m excited about the potential of combining AI with IoT as discussed in the seminar.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The insights into reinforcement learning for robotics were highly motivating.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The interdisciplinary approach to merging CS with biology was innovative.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I appreciated the session on ethical AI and bias mitigation.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The discussion on optimizing neural network architectures was very enlightening.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The seminar highlighted many challenges and opportunities in modern CS research.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I’m intrigued by the new developments in self-supervised learning mentioned today.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The presentation on graph neural networks was detailed and very informative.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I found the focus on adaptive learning techniques particularly useful.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The seminar's exploration of scalable distributed systems was very well presented.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I appreciate the clear examples provided on the application of AI in cybersecurity.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The discussion on combining symbolic reasoning with neural networks was fascinating.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I learned a lot about the latest trends in data-centric AI during the seminar.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The seminar provided a comprehensive view of future CS innovations.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I’m excited to implement some of these innovative ideas into my research.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The emphasis on ethical considerations in AI is more important than ever.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The session on meta-learning was a highlight for me—very forward-thinking.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I appreciate the detailed breakdown of the latest research methodologies shared today.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The seminar really showcased how emerging technologies can transform our field.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I’m looking forward to the networking session after the seminar to discuss these ideas further.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The keynote on quantum computing was particularly enlightening.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I found the integration of AI and cybersecurity very compelling.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The seminar highlighted many new research opportunities in CS that I hadn’t considered before.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I’m inspired by the potential of using AI to solve real-world problems presented today.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The discussion on federated learning provided fresh insights into data privacy.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I really appreciated the balanced approach between theory and application during the seminar.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The seminar's content is a clear indicator of where the CS field is heading.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I’m eager to apply some of these advanced techniques in my own research projects.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The session on neural architecture search was very comprehensive and informative.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I found the part about AI ethics and bias mitigation particularly relevant.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The emphasis on interdisciplinary research in the seminar has given me many ideas.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I appreciated the clear presentation of the latest trends in AI and machine learning.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The seminar highlighted innovative research that could redefine computer science.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The discussion on scalable distributed systems was one of the best parts of the seminar.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I’m impressed by the potential applications of AI in various industries discussed today.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The integration of advanced algorithms with real-world applications was very inspiring.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The seminar gave me a lot to think about regarding the future of technology in CS.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I’m looking forward to discussing these innovative ideas with my research group.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The seminar was an excellent blend of cutting-edge research and practical insights.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I found the segment on AI-driven automation very useful for my research.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The insights on integrating blockchain with CS research were innovative and timely.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I appreciated the detailed case studies that were presented during the seminar.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The seminar provided a clear roadmap for future research directions in CS.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The focus on both theoretical foundations and practical implementations was very impressive.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I am excited to explore the research opportunities discussed in the seminar.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The seminar has motivated me to pursue more advanced research projects in AI.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I am inspired by the potential impact of these innovations on the future of CS.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The seminar was a great opportunity to network and exchange ideas with fellow researchers.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I look forward to applying some of these innovative strategies in my next project.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The discussion on real-time data processing in AI was particularly relevant to my work.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The seminar covered so many diverse topics that it really broadened my perspective.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I appreciate the seminar’s focus on emerging technologies and their practical applications.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The insights shared about future trends in machine learning were very forward-thinking.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I am excited to see how these innovations will shape the future of computer science.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "This seminar has truly set the stage for the next generation of CS research.",
            },
          ],
        },
        {
          title: "Publication Deadlines and Conference Announcements",
          main_post:
            "Stay up to date with upcoming publication deadlines and conference announcements in the field of Computer Science. Share information about submission dates, paper acceptance rates, keynote speakers, and new emerging conferences. Whether it's about AI, cybersecurity, software engineering, or quantum computing, let’s keep each other informed!",
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          replies: [
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "ICLR 2025 paper submission deadline is in October 2024. Anyone working on AI/ML should start preparing now!",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "NeurIPS 2024 workshop submissions are due in June. Great opportunity for ML researchers!",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "IEEE Security & Privacy Symposium is accepting papers until November 15, 2024. A top-tier venue for cybersecurity research.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "CHI 2025 (Human-Computer Interaction) submissions close in September 2024. Perfect for UX and HCI researchers.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The deadline for ICCV 2025 submissions is approaching. Anyone working on computer vision should check it out.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "KDD 2024 camera-ready deadline is next month. Excited to see the latest work in data mining and machine learning!",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Is there any conference focused on blockchain and distributed ledger technologies?",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Yes! The IEEE Blockchain Conference and the ACM DLT Conference both focus on blockchain research.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "AAAI 2025 submission deadline is set for September 2024. One of the leading AI conferences!",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Does anyone know when the SIGGRAPH 2025 submission deadline is?",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "SIGGRAPH 2025 full paper submission deadline is usually in January. They have a separate deadline for posters and short papers.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The deadline for the USENIX Security Symposium is usually in February. A must for security researchers!",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Has anyone attended the Conference on Applied Cryptography and Network Security (ACNS) before?",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Yes, ACNS is great for cryptography and cybersecurity research. The next deadline is in March 2025.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "AI conferences are growing fast! ICLR, NeurIPS, ICML, AAAI, and CVPR are top-tier.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Does anyone know if there's a dedicated conference for explainable AI (XAI)?",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "AIES (Artificial Intelligence, Ethics, and Society) and FAccT focus on fairness and explainability in AI.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Looking for NLP conferences? ACL, EMNLP, and NAACL are the biggest ones!",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Any suggestions for beginner-friendly CS conferences where early researchers can present their work?",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Try student workshops at major conferences or look into regional ACM/IEEE chapters that host events.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Is anyone submitting to the ICSE 2025 (International Conference on Software Engineering)?",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "SIGMOD and VLDB are great conferences for database researchers!",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Don't forget about HotNets if you're into networking research!",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "IEEE BigData 2024 has a workshop on AI-driven data analytics. Sounds interesting!",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "What are some interdisciplinary conferences that merge CS with other fields?",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Check out IEEE VIS (for visualization), BIBM (bioinformatics), and CIKM (information management).",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Upcoming AI and Healthcare conference: MICCAI 2024 focuses on medical imaging with deep learning.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Are there any good workshops on reinforcement learning?",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "NeurIPS and ICML usually have RL-focused workshops.",
            },
          ],
        },
      ],
    },
    {
      title: "Campus Chronicle: University-Wide Announcements",
      type: "general",
      threads: [
        {
          title: "University Schedule Changes for Upcoming Semester",
          main_post:
            "Important update regarding the university schedule for the upcoming semester. Changes have been made to class timings, examination dates, and academic events to optimize learning experiences. Please review the updated schedule and feel free to share any concerns or clarifications. Let's ensure a smooth transition into the next semester!",
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          replies: [
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Will the new class schedule affect evening courses? Some students rely on evening slots due to work commitments.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I heard that final exams will be spaced out better to reduce the stress of back-to-back papers. Can someone confirm?",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Good move! Spreading out exams will definitely help students perform better without excessive pressure.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Are there any changes to lab schedules? Some courses require additional lab hours for better hands-on experience.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The updated timetable shows that the semester starts a week earlier than last year. Will the break durations remain the same?",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I appreciate the new schedule format! It seems to be structured better, avoiding too many early morning lectures.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Are mid-term dates finalized? Last semester, they were changed last minute, which made planning difficult.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Will there be any adjustments for students taking interdisciplinary courses across different departments?",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Does anyone know if class durations have been adjusted? I heard rumors that lecture times might be shortened.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "How will the new changes affect students participating in co-op or internship programs?",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Will the university provide an official PDF of the new timetable, or do we need to check manually online?",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Some classes are being moved to different buildings—any idea why this change was made?",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I hope the schedule changes include better time slots for elective courses. Some options were too restricted last semester.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Are online classes still available for students who prefer hybrid learning?",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Did they adjust break times between consecutive classes? Running from one class to another with no gap was exhausting.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "When will the official notification about these schedule changes be sent via email?",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Are there any changes to student club meeting times due to the new class schedule?",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Will study breaks be maintained, or are they cutting down days to accommodate the earlier semester start?",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Hope they haven't scheduled exams too close to major holidays. Last time, that made traveling difficult for some students.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Do we have an official start date for summer courses? The new semester timing might affect those.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Have faculty members been consulted about these changes? Some professors already had their lecture plans set.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Will there be an official Q&A session to discuss these schedule changes before the semester begins?",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Can someone confirm if the library hours will also change to match the new class schedule?",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Does this affect the availability of professors for office hours? Those are important for students needing extra help.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Where can we find a visual representation of the updated schedule? A calendar format would help.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Hope this doesn't interfere with research assistantship schedules. Research students need stability in their work hours.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Are meal plans in campus dining halls being adjusted to fit the new schedule?",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The schedule changes seem reasonable, but I hope there’s enough flexibility for students with multiple commitments.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Do students have any input in future schedule planning? Would be great to have a feedback system.",
            },
          ],
        },
        {
          title: "New Campus Facilities Now Open",
          main_post:
            "Exciting news! The university has officially opened new campus facilities to enhance student life and learning experiences. These include a state-of-the-art library extension, an advanced research lab, a student wellness center, and upgraded recreational spaces. Check them out and share your thoughts on how these new facilities can benefit the campus community!",
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          replies: [
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "The new library extension is amazing! More study spaces and quiet zones were much needed.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Excited to check out the advanced research lab! What fields of study will have access to it?",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The wellness center is a great addition! Mental health and relaxation spaces are so important for students.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Does anyone know the operating hours for these new facilities? Would love to plan a visit.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The recreational space upgrade is great news! More seating areas and greenery will definitely improve campus life.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I hope the research lab has modern computing resources for CS students. Does anyone have more details?",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Are these new facilities accessible to all students, or do some require special permissions?",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Finally, more quiet study areas! The existing library gets so crowded during finals season.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The new student lounge looks great! More comfortable spaces to hang out between classes.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Will the gym facilities be expanded as well? More fitness options would be great.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The tech upgrades in the library will be super useful for research work. Looking forward to exploring them!",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Will there be an official campus tour for these new facilities? Would love a walkthrough.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Having a dedicated wellness center is such a positive step. Hope they offer stress management workshops.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Can non-residential students also access the lounge areas? Would be a great place to study between classes.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Is there a place where we can provide feedback on these new spaces? Would love to see more power outlets in study areas.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I hope the new library extension also includes private rooms for group discussions. Those were always in high demand!",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "It would be great if the research lab hosted workshops on how to use the new technology available.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The additional seating areas outside are such a nice touch. A great spot to relax between classes.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Does anyone know if the wellness center has counseling services available for students?",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Will there be an official inauguration event for these new spaces? Would love to attend.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The university should consider adding more shaded outdoor study spaces. It's great for fresh air while working!",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Are there specific areas in the research lab for undergrad students, or is it mostly for postgraduates?",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I hope the recreational spaces include more group-friendly seating for project meetings.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "The campus keeps improving! Looking forward to making full use of these new facilities.",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Are the new computer labs available 24/7? Some students prefer late-night study sessions.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Will there be additional funding for research projects with the opening of the new lab?",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "What kind of equipment is available in the research lab? Any high-performance computing resources?",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Having more space to collaborate on projects is a great improvement. Thanks to the university for this!",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Hope there are more tech-enabled study rooms with whiteboards and smart screens.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "More quiet zones in the library mean better concentration during exam season. This is a win!",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Will there be an online booking system for reserving spaces in these new facilities?",
            },
          ],
        },
        {
          title: "Safety Alerts and Emergency Procedures Update",
          main_post:
            "The university has updated its safety protocols and emergency procedures to ensure a secure campus environment for all students and staff. New measures include an improved emergency notification system, additional safety drills, and updated evacuation plans. Please review the guidelines and be prepared in case of emergencies. Your safety is our top priority!",
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          replies: [
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "This is a great initiative! Will there be mandatory safety training sessions for students?",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "The updated emergency notification system sounds useful. How will students receive alerts?",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Are there designated safe zones on campus in case of natural disasters?",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Will the university conduct live emergency drills for fire and earthquake preparedness?",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Is there a way to report safety concerns anonymously?",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Where can students access the updated evacuation plans?",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "I hope the security team has increased patrols in less crowded areas of campus.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Does the university provide self-defense workshops for students?",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Will there be more emergency call stations installed across campus?",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Does the university have a specific emergency plan for chemical or lab-related incidents?",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "I hope all faculty and staff are also trained in these new safety measures.",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Where can we sign up for safety training sessions?",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Are emergency procedures also being updated for dormitories and residential areas?",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Is there a mobile app for emergency alerts and reporting issues?",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Will there be any changes to campus security response times?",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Can international students access safety information in multiple languages?",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "What measures are in place to handle medical emergencies on campus?",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Will there be an awareness campaign to educate students about these changes?",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "It's good to know the university is prioritizing safety. Hope we also get quick response protocols for threats.",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Are security escorts available for students walking late at night?",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Does the university have a designated emergency response team?",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Are there any emergency shelters on campus in case of extreme weather?",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Will students be able to volunteer for campus safety programs?",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "How often will emergency drills be conducted?",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "What should students do if they receive an emergency alert while in class?",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Are there any partnerships with local authorities for handling larger emergencies?",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Will there be an FAQ section on the university website regarding these new procedures?",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "What steps are being taken to prevent security breaches on campus?",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "How can students suggest improvements to the current safety protocols?",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "I appreciate the university's focus on safety. Looking forward to seeing these updates implemented.",
            },
          ],
        },
        {
          title: "University Open House: Event Details",
          main_post:
            "We are excited to announce the upcoming University Open House! This event is a great opportunity for prospective students, parents, and the community to explore our campus, interact with faculty, and learn more about our academic programs. Join us for campus tours, Q&A sessions, and special presentations. Date: [Insert Date], Time: [Insert Time], Location: [Insert Venue]. Don't miss this chance to experience university life firsthand!",
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          replies: [
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "This sounds amazing! Will there be a live stream for those who can't attend in person?",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Are there any special sessions for transfer students?",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Will there be an opportunity to meet current students and ask about their experiences?",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Looking forward to the campus tour! Will there be guided groups, or can we explore freely?",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Are registration fees required for attending the Open House?",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Excited about the Q&A session! Can we submit our questions beforehand?",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Will there be separate sessions for different majors and departments?",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Can high school students bring parents or guardians along?",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Will there be an introduction to student clubs and organizations?",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Will admissions officers be available to discuss application requirements?",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Are there any workshops on scholarships and financial aid?",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Will faculty members be available for one-on-one discussions?",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Excited to visit! Will there be parking available for visitors?",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "How long will each session last during the Open House?",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Will there be student panels where we can hear about daily life at the university?",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "What COVID-19 precautions, if any, will be in place for the event?",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Is this event open to international students interested in applying?",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Will the cafeteria or dining halls be open during the event for visitors?",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Can attendees request a meeting with specific professors?",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Is there a way to get a printed guide for the Open House schedule?",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Will there be representatives from student support services?",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Will there be a chance to visit the dormitories during the tour?",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Looking forward to exploring the research labs! Will they be open for tours?",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Is there a way to get in touch with admissions counselors after the event?",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Are there any planned networking opportunities with alumni?",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "Will there be merchandise or brochures available for prospective students?",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Looking forward to the event! Will there be any surprises or giveaways?",
            },
            {
              user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
              text: "Can we take photos and videos during the Open House?",
            },
            {
              user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
              text: "How can we provide feedback after attending the Open House?",
            },
            {
              user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
              text: "Will there be transportation assistance for students traveling from far locations?",
            },
          ],
        },
      ],
    },
  ],

  // threads not part of forums
  standaloneThreads: [
    {
      title: "Exam Preparation Tips for Batch 2021",
      main_post:
        "Exam Preparation Tips for Batch 2021: This thread is dedicated to sharing effective strategies, study methods, and resources to help Batch 2021 prepare for exams. Please share your techniques, study schedules, resource recommendations, and any advice that has helped you succeed academically.",
      group: "batch",
      type: "discussion",
      user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
      replies: [
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Use spaced repetition to review key concepts daily.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Practice previous exam papers to familiarize yourself with the question format.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Form a detailed study schedule and stick to it consistently.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Break study sessions into focused intervals using the Pomodoro technique.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Create summary notes for each topic to consolidate your understanding.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Utilize flashcards to memorize formulas and key definitions.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Test yourself regularly with practice quizzes and self-made tests.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Group study sessions can help clarify difficult concepts through discussion.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Focus on understanding concepts rather than relying solely on memorization.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Review your mistakes from practice tests to avoid repeating them.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Prioritize topics based on their importance and your personal weaknesses.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Teach a concept to a friend—it reinforces your own understanding.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Use mind maps to visualize relationships between key topics.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Set realistic study goals for each session and track your progress.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Ensure you get enough sleep, as proper rest is vital for memory retention.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Eat healthily and stay hydrated during your study periods.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Maintain a distraction-free study environment to improve focus.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Schedule regular breaks to avoid burnout during long study sessions.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Revise consistently rather than cramming at the last minute.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Utilize online resources like video tutorials and interactive modules.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Review your lecture notes soon after class to reinforce learning.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Make a list of key formulas and definitions for quick revision.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Discuss challenging topics with peers or teachers for clearer understanding.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Practice problem-solving regularly to build speed and accuracy.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Plan your revision strategy at least a week before exams.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Create a dedicated study area that enhances your concentration.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Use past exam papers to familiarize yourself with common question types.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Prioritize your revision based on your performance in practice tests.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Take short naps to recharge during long study sessions.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Update your study plan regularly to reflect your progress.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Use educational apps to test your knowledge on the go.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Balance your study time evenly across all subjects.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Reward yourself after completing each study goal to stay motivated.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Discuss your study plan with a mentor for personalized advice.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Break large topics into smaller, manageable chunks.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Use a timer to keep your study sessions on track.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Review and summarize each chapter after studying.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Create a revision checklist to ensure you cover all important topics.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Incorporate visual aids like charts and diagrams into your notes.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Test your understanding by explaining concepts in your own words.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Keep your study materials organized and easy to access.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Join study groups to exchange ideas and enhance your learning.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Review sample essays or solutions to improve your writing skills.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Focus on quality study time rather than just the number of hours.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Practice deep breathing or meditation to reduce exam anxiety.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Schedule mock exams under timed conditions to simulate the real test environment.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Utilize revision guides and summaries from trusted sources.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Create your own practice tests to challenge your understanding.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Focus on problem areas first before reviewing topics you are confident in.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Set aside time each day for revision, even if it's just 30 minutes.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Organize your study notes by subject for quick reference.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Use online forums to ask questions and share tips with peers.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Plan a revision timetable and avoid procrastination.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Keep a record of your study sessions to track improvement.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Use mnemonic devices to remember complex information.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Participate in online mock exams to benchmark your performance.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Review your study schedule weekly and adjust as needed.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Use color-coding in your notes to highlight key information.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Create summary sheets for quick revision of each subject.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Engage in active revision by discussing topics with peers.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Focus on understanding underlying principles rather than rote memorization.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Practice writing clear and concise answers under exam conditions.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Maintain a checklist of topics to cover in each study session.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Discuss your revision plan with a mentor to get feedback.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Break down revision into short, focused sessions to maximize retention.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Track your progress and adjust your study methods if necessary.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Use flashcards for quick revision during short breaks.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Explain complex concepts out loud to reinforce your understanding.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Set clear, achievable goals for each revision session.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Balance your revision time across all subjects to avoid neglect.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Stay positive and remember that consistent effort pays off.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Engage with interactive revision tools available online to test your knowledge.",
        },
      ],
    },
    {
      title: "Internship Opportunities for Batch 2021",
      main_post:
        "Exam Preparation Tips for Batch 2021: This thread is dedicated to sharing effective strategies, study methods, and resources to help Batch 2021 prepare for exams. Please share your techniques, study schedules, resource recommendations, and any advice that has helped you succeed academically.",
      group: "batch",
      type: "discussion",
      user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
      replies: [
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Use spaced repetition to review key concepts daily.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Practice previous exam papers to familiarize yourself with the question format.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Form a detailed study schedule and stick to it consistently.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Break study sessions into focused intervals using the Pomodoro technique.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Create summary notes for each topic to consolidate your understanding.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Utilize flashcards to memorize formulas and key definitions.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Test yourself regularly with practice quizzes and self-made tests.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Group study sessions can help clarify difficult concepts through discussion.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Focus on understanding concepts rather than relying solely on memorization.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Review your mistakes from practice tests to avoid repeating them.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Prioritize topics based on their importance and your personal weaknesses.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Teach a concept to a friend—it reinforces your own understanding.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Use mind maps to visualize relationships between key topics.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Set realistic study goals for each session and track your progress.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Ensure you get enough sleep, as proper rest is vital for memory retention.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Eat healthily and stay hydrated during your study periods.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Maintain a distraction-free study environment to improve focus.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Schedule regular breaks to avoid burnout during long study sessions.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Revise consistently rather than cramming at the last minute.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Utilize online resources like video tutorials and interactive modules.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Review your lecture notes soon after class to reinforce learning.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Make a list of key formulas and definitions for quick revision.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Discuss challenging topics with peers or teachers for clearer understanding.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Practice problem-solving regularly to build speed and accuracy.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Plan your revision strategy at least a week before exams.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Create a dedicated study area that enhances your concentration.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Use past exam papers to familiarize yourself with common question types.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Prioritize your revision based on your performance in practice tests.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Take short naps to recharge during long study sessions.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Update your study plan regularly to reflect your progress.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Use educational apps to test your knowledge on the go.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Balance your study time evenly across all subjects.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Reward yourself after completing each study goal to stay motivated.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Discuss your study plan with a mentor for personalized advice.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Break large topics into smaller, manageable chunks.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Use a timer to keep your study sessions on track.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Review and summarize each chapter after studying.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Create a revision checklist to ensure you cover all important topics.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Incorporate visual aids like charts and diagrams into your notes.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Test your understanding by explaining concepts in your own words.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Keep your study materials organized and easy to access.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Join study groups to exchange ideas and enhance your learning.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Review sample essays or solutions to improve your writing skills.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Focus on quality study time rather than just the number of hours.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Practice deep breathing or meditation to reduce exam anxiety.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Schedule mock exams under timed conditions to simulate the real test environment.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Utilize revision guides and summaries from trusted sources.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Create your own practice tests to challenge your understanding.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Focus on problem areas first before reviewing topics you are confident in.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Set aside time each day for revision, even if it's just 30 minutes.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Organize your study notes by subject for quick reference.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Use online forums to ask questions and share tips with peers.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Plan a revision timetable and avoid procrastination.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Keep a record of your study sessions to track improvement.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Use mnemonic devices to remember complex information.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Participate in online mock exams to benchmark your performance.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Review your study schedule weekly and adjust as needed.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Use color-coding in your notes to highlight key information.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Create summary sheets for quick revision of each subject.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Engage in active revision by discussing topics with peers.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Focus on understanding underlying principles rather than rote memorization.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Practice writing clear and concise answers under exam conditions.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Maintain a checklist of topics to cover in each study session.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Discuss your revision plan with a mentor to get feedback.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Break down revision into short, focused sessions to maximize retention.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Track your progress and adjust your study methods if necessary.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Use flashcards for quick revision during short breaks.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Explain complex concepts out loud to reinforce your understanding.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Set clear, achievable goals for each revision session.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Balance your revision time across all subjects to avoid neglect.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Stay positive and remember that consistent effort pays off.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Engage with interactive revision tools available online to test your knowledge.",
        },
      ],
    },
    {
      title: "Department Meeting Recap and Q&A",
      main_post:
        "This thread is dedicated to recapping the departmental meeting and providing a Q&A session for any clarifications needed. Please share your thoughts, questions, and feedback regarding the discussions and decisions made in the meeting.",
      group: "department",
      type: "discussion",
      user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
      replies: [
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "The meeting clarified key updates regarding the departmental budget allocations.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "I found the recap very useful in understanding the upcoming research initiatives.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "There were some questions regarding faculty appointments; can someone clarify?",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "The Q&A session was informative, particularly on course restructuring.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "I appreciated the transparent discussion on grant funding for research.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "The recap mentioned new collaborations with industry partners which is exciting.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "I have a query regarding the timeline for the new curriculum implementation.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "The department head provided detailed insights on upcoming projects.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "The meeting covered critical points on faculty development programs.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "I think the Q&A clarified our concerns about lab resource allocation.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "I was impressed with the discussion on inter-departmental research opportunities.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "The recap included updates on new equipment for the labs.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Could someone elaborate on the changes proposed in the research agenda?",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "The discussion on student mentorship programs was very encouraging.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "I have a question about the revised course evaluation process.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "The recap highlighted several strategic goals for the upcoming year.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "I appreciated the detailed breakdown of departmental performance metrics.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "The Q&A addressed many of my concerns regarding faculty promotions.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "I noticed a mention of increased funding for collaborative projects.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "There was an interesting discussion on integrating new technology in classrooms.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "The meeting recap provided clarity on administrative reforms.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "I have a query about the process for applying for research grants.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "The Q&A section was very interactive and answered several questions.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "I found the recap on student engagement initiatives very promising.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "There was a detailed discussion on updating the departmental website.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "The meeting addressed future plans for upgrading our research facilities.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "I appreciate the efforts to increase interdisciplinary collaboration.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "The recap mentioned upcoming seminars on advanced topics.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "I have a question about the revised faculty workload policy.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "The meeting covered important points on course accreditation updates.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "I was pleased to see a focus on diversity and inclusion in the department.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "The Q&A clarified the scheduling for upcoming workshops.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "The recap detailed the planned expansion of our research centers.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "I have a question regarding the policy changes discussed during the meeting.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "The departmental meeting recap was thorough and well-structured.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "The Q&A session shed light on the expected changes in our curriculum.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "I appreciated the discussion on enhancing industry partnerships.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "The meeting mentioned a new initiative for student research funding.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "There was a comprehensive overview of departmental performance in the meeting.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "I have a question about the upcoming changes in lab management.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "The meeting provided detailed insight into the new grant application process.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "The Q&A session highlighted several points on faculty workload distribution.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "I appreciated the discussion on innovative teaching methods during the meeting.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "The recap outlined clear targets for increasing our research publications.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "I have a question about the integration of new technology in our teaching labs.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "The meeting discussed potential collaborations with industry leaders.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "The Q&A session provided clarity on the new faculty recruitment policies.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "I was impressed with the detailed discussion on improving student mentorship.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "The recap mentioned the upcoming departmental review and accreditation process.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "I have a query about the schedule for the next departmental workshop.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "The meeting addressed the need for additional research funding and resources.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "The Q&A clarified the process for faculty evaluations and promotions.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "I appreciated the focus on digital transformation in the department.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "The recap highlighted several strategies for enhancing course content.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "I have a question about the support available for interdisciplinary projects.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "The meeting discussed ways to leverage technology for better learning outcomes.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "The Q&A session was very transparent regarding the upcoming changes in curriculum.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "I noted the update on faculty development programs and training sessions.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "The recap provided a comprehensive overview of our departmental strategic plan.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "I have some concerns about the proposed changes to the course review process.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "The meeting emphasized the importance of student feedback in shaping policies.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "The Q&A addressed several questions on future research directions.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "I appreciated the detailed update on new lab facilities and equipment.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "The recap mentioned plans to enhance the collaboration with international institutions.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "I have a query regarding the new mentorship program for junior faculty.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "The meeting covered important points on departmental ethics and compliance.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "The Q&A session clarified many of my doubts about the budget allocations.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "I noted the discussion on improving the communication channels within the department.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "The recap provided clear guidelines on upcoming academic reviews.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "I have a question about the revised policies on course feedback.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "The meeting addressed the future direction for research and innovation in CS.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "The Q&A was insightful, especially regarding the integration of new teaching tools.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "I appreciated the update on collaborative projects with industry and academia.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "The recap detailed plans for increasing research grants and external funding.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "I have some questions about the new online platforms for departmental communication.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "The meeting emphasized the need for continuous improvement in our academic programs.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "The Q&A session was very effective in clarifying the changes to faculty responsibilities.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "I noted the discussion on setting up new online portals for easier communication.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "The recap provided an update on the upcoming academic calendar revisions.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "I have a question about the feedback mechanism discussed during the meeting.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "The meeting addressed future strategies for increasing departmental research output.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "I appreciated the clarification on the timeline for faculty evaluations.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "The Q&A session helped address several lingering doubts about the new policies.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "I found the meeting recap to be very thorough and well-organized.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "The open Q&A session allowed for transparent discussion of departmental challenges.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "I appreciated the detailed insights on upcoming research initiatives.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "The recap mentioned clear plans for improving our collaborative projects.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "I have a question regarding the allocation of funds for new lab equipment.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "The meeting was very informative, especially on the subject of curriculum updates.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "I appreciated the focus on faculty development during the Q&A session.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "The recap outlined several initiatives to enhance student-faculty interactions.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "I have a query about the proposed changes in the research grant application process.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "The meeting provided a clear roadmap for addressing departmental challenges.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "I found the discussion on strategic goals particularly enlightening.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "The Q&A session helped me understand the expected timeline for new initiatives.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "The recap mentioned plans for updating our research collaboration platforms.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "I have some suggestions on improving internal communication based on the meeting.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "The meeting effectively addressed our concerns about faculty workload distribution.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "I appreciated the clear explanation of upcoming administrative changes.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "The recap mentioned new initiatives to enhance interdisciplinary research.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "I have a question regarding the integration of new teaching methodologies.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "The Q&A session clarified how the new policies will affect our day-to-day operations.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "I appreciated the update on the timeline for departmental accreditation reviews.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "The meeting recap was very detailed and provided actionable insights.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "I have a query about how the new funding allocation will impact our projects.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "The Q&A session allowed us to address many of our pressing concerns.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "I appreciated the clear guidelines provided on the upcoming review cycles.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "The meeting provided a comprehensive update on our departmental strategic plan.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "I have some questions about the process for applying for new research grants.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "The recap outlined several key performance indicators that we need to focus on.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "I appreciated the discussion on future plans for faculty development and training.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "The meeting clarified the expected outcomes for our upcoming research initiatives.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "I have a query regarding the role of external consultants in our strategic planning.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "The Q&A session helped me understand the new policies on resource allocation.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "I appreciated the detailed update on our departmental performance metrics.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "The meeting addressed several key issues regarding faculty workload and research funding.",
        },
      ],
    },
    {
      title: "Programming Contest Preparation",
      main_post:
        "This thread is dedicated to sharing strategies, tips, and resources for preparing for programming contests. Discuss practice techniques, algorithmic challenges, contest strategies, and personal experiences to help us all improve our coding and problem-solving skills.",
      group: "department",
      type: "discussion",
      user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
      replies: [
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Focus on mastering dynamic programming; it's crucial for many contest problems.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Practice graph algorithms regularly as they frequently appear in contests.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Review common data structures like segment trees and binary indexed trees.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Solve past contest problems to understand the typical problem patterns.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Participate in online contests to simulate real competition conditions.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Brush up on computational geometry—it's a common topic in contests.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Learn how to optimize your code to run within strict time limits.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Practice implementing algorithms in your preferred language to build speed.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Focus on writing clean and efficient code that minimizes runtime.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Try to solve problems under timed conditions to simulate contest pressure.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Study string algorithms; many contests include problems on pattern matching.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Understand bit manipulation; it's often useful for optimization problems.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Practice greedy algorithms and learn when they can be applied effectively.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Quickly identify the problem type to apply the most suitable algorithm.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Participate in mock contests to build endurance and practice time management.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Review sorting and searching techniques; they're fundamental for many problems.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Improve your problem-solving skills by practicing a variety of algorithmic challenges.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Participate in online judges like Codeforces and AtCoder to gain contest experience.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Learn how to debug your code quickly under contest conditions.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Focus on implementing advanced data structures like tries and AVL trees.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Work on problems that require efficient I/O techniques for large datasets.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Practice problems that test both your speed and accuracy in coding.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Review dynamic programming on trees for hierarchical problems.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Focus on coding under pressure by simulating contest environments at home.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Study previous contest editorials to learn effective problem-solving strategies.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Participate in team contests to improve collaboration and strategy planning.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Learn common techniques in competitive programming from top coder blogs and forums.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Focus on revising core mathematical concepts used in algorithm analysis.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Practice segment tree problems to efficiently handle range queries.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Review union-find algorithms for solving connectivity problems.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Study string matching algorithms such as KMP and Rabin-Karp for pattern detection.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Focus on understanding greedy algorithms to recognize optimal substructures.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Practice problems on recursion and memoization to improve dynamic programming skills.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Learn how to perform time complexity analysis to choose the best algorithm for a problem.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Participate in mock contests and review your performance to identify improvement areas.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Use online coding platforms to practice under simulated contest conditions.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Focus on problems that require both algorithmic thinking and efficient coding.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Practice with timed coding challenges to build your speed and accuracy.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Review your mistakes after each contest to understand where you can improve.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Learn to identify problem patterns quickly by practicing with a variety of contest problems.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Work on problems that combine multiple algorithms to build a robust skill set.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Join online communities to discuss strategies and learn from top competitors.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Focus on solving problems that push your boundaries and teach you new techniques.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Analyze editorials from past contests to understand optimal solutions.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Learn to write concise code that minimizes unnecessary overhead.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Practice debugging under pressure to quickly fix errors during contests.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Work on a diverse set of problems to build versatility in your problem-solving skills.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Review core algorithms from textbooks to solidify your theoretical foundations.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Participate in group contests to learn from others and improve your teamwork.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Focus on optimizing your code by minimizing redundant computations.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Keep a log of the problems you solve and the strategies used for each.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Study advanced topics like string algorithms and computational geometry for tougher contests.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Focus on mastering algorithmic techniques that are frequently tested in contests.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Participate regularly in online competitions to measure your progress over time.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Work on problems that combine mathematics and programming for a well-rounded skill set.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Try to solve problems without looking at solutions to develop your own approach.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Use online judges to practice a variety of problems under contest-like conditions.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Focus on understanding problem constraints to design efficient solutions.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Improve your coding speed by setting small, timed challenges for yourself.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Learn from your mistakes by reviewing failed attempts and understanding the errors.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Maintain consistency in practice to build a strong problem-solving foundation.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Focus on both the theoretical and practical aspects of algorithms.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Regularly analyze the time complexity of your solutions to ensure efficiency.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Try solving problems in different programming languages to expand your skill set.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Engage in peer discussions to share unique insights and strategies.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Keep updated with contest rules and format changes by following official announcements.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Focus on sharpening your logical reasoning skills along with coding practice.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Practice problems that require innovative approaches to improve adaptability.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Work on problem sets that cover a wide range of topics to ensure versatility.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Participate in weekly contests to track your progress and set benchmarks.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Focus on writing pseudocode first to plan your solution effectively.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Analyze the editorial of each contest to understand different approaches to the same problem.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Practice using built-in functions and libraries effectively to save coding time.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Develop a habit of writing clean, modular code to reduce errors during contests.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Keep practicing and don’t be discouraged by setbacks; improvement comes with persistence.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Review your code critically after each contest to identify areas for optimization.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Focus on understanding the problem deeply before jumping into coding.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Participate in group practice sessions to learn diverse problem-solving techniques.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Set clear, achievable goals for each contest to track your progress effectively.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Analyze different solutions for the same problem to understand alternative approaches.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Focus on both speed and accuracy, and practice balancing the two.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Make a list of topics you find challenging and review them regularly.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Participate in peer reviews to get feedback on your coding style and logic.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Use online judges to practice a wide range of problems and track your progress.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Develop a checklist of common mistakes to avoid during contests.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Keep a personal log of contest experiences and lessons learned.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Focus on improving your debugging skills to quickly identify and fix errors.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Practice with time constraints to simulate real contest conditions.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Review algorithmic complexities to ensure your solution is optimal.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Work on developing a strong intuition for problem-solving through varied practice.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Keep learning new algorithms and data structures to expand your knowledge base.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Stay updated with the latest contest problems and solutions on coding forums.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Review your contest performance and analyze what could be improved next time.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Practice implementing standard algorithms from scratch without relying on libraries.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Focus on optimizing both your code and your thought process during contests.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Participate in virtual coding contests to build a competitive spirit.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Consistently practice and refine your approach to problem-solving for long-term improvement.",
        },
      ],
    },
    {
      title: "Annual Cultural Fest Schedule & Details",
      main_post:
        "We are thrilled to announce the schedule for this year's Annual Cultural Fest! This event is packed with exciting performances, cultural showcases, and interactive workshops. The fest will feature music, dance, drama, art exhibitions, food stalls, and more. It's a great opportunity to experience diverse cultures and talents. The event will run from [Insert Date] to [Insert Date], with activities happening across various campus venues. Don't miss out on this vibrant celebration of art and culture!",
      group: "batch",
      type: "announcement",
      user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
      replies: [
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "This sounds like a lot of fun! Are there any performances by international artists this year?",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "I love attending the cultural fest every year. Will there be any new activities added this time?",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Can't wait to check out the food stalls! Will there be a variety of international cuisines?",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Are there any workshops for students interested in cultural arts or music?",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Looking forward to the dance performances! Are there any new dance troupes this year?",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Excited for the drama performances! Will there be any student-led plays this year?",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Is there an entry fee for attending the fest or are events free for all students?",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Will there be any special performances or celebrity guests this year?",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Will there be any workshops on traditional arts, like painting or sculpture?",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Are there any fashion shows or beauty-related activities planned?",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Will the cultural fest include any environmental sustainability or awareness activities?",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "I'm curious if there will be any interactive cultural games or contests?",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Can we sign up for specific activities or events in advance?",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "How do we participate in the art exhibitions? Do we need to register beforehand?",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Will there be any virtual events or live streams for those who cannot attend in person?",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Will there be a chance to collaborate with other students on cultural art projects?",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Is there a specific dress code for attending the cultural fest?",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "I heard there will be a special performance by the music department—can't wait for that!",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Will there be any workshops on cultural dance forms from around the world?",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Will the event include any talks or discussions on global cultural heritage?",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Looking forward to the art exhibitions! Can we expect to see work from local artists as well?",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Are there any student clubs involved in organizing the event?",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Excited for the food, will there be food trucks or will they be set up in stalls?",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Will the cultural fest have any activities related to mental health or wellness?",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Looking forward to the performances! Any sneak peeks or teasers available online?",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "How long does the cultural fest last each day? Are there specific times for different activities?",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Are the cultural exhibits open to the public, or is it just for students?",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Can international students showcase their culture at the fest?",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Will there be any workshops or panels on the influence of technology on cultural practices?",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Will there be any performances that feature traditional or folk music?",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "What time do the performances start each day? Is there a schedule available?",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Is there an opening ceremony for the fest?",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Can we volunteer to help organize or manage any of the fest's activities?",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "How do we stay updated on any changes or new additions to the schedule?",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Will there be a chance to interact with the performers after their shows?",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Will the cultural fest include any exhibits or demonstrations about cultural history?",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "What is the best way to register for a performance or activity?",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Is there a limit to how many performances a person can attend in one day?",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "How do we get involved in organizing future cultural events like this one?",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Will there be any international cuisine available at the food stalls?",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Is there an option to donate or contribute to the event?",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Will the cultural fest feature any student exhibitions from the art department?",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "How do I register for the dance workshops?",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Will there be performances that mix cultural and modern elements?",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Can alumni attend the cultural fest?",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "How do I get tickets for the drama performances?",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Is there a theme for the cultural fest this year?",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Will there be any performances by local theater groups?",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Are there any interactive exhibits that allow us to try out different cultural crafts?",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Can we purchase cultural products or souvenirs during the fest?",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "I hope the event also focuses on cultural education alongside the entertainment.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Will there be any activities for children or families to participate in?",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Are there any events planned to showcase traditional sports or games?",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Do we need to bring any special equipment or supplies for certain workshops?",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "How can I volunteer to help with setting up for the cultural fest?",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Is the cultural fest going to be spread across multiple days or just one?",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Will the cultural fest include any educational lectures or panel discussions?",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Are there any exciting collaborations with local artists or performers?",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Can we expect to see traditional clothing or fashion showcased at the fest?",
        },
      ],
    },
    {
      title: "Sports Tournament Registration Now Open",
      main_post:
        "The registration for the highly anticipated Sports Tournament is now open! Whether you're a seasoned athlete or just looking for some fun, we have events for everyone. Categories include basketball, football, tennis, and badminton. Don't miss out on the chance to compete and showcase your skills. Sign up today and be part of the excitement! For more details on the schedule and registration process, check the event website.",
      group: "batch",
      type: "announcement",
      user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
      replies: [
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Can we register as a team or only individually?",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Are there age group divisions for the different sports?",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Do we need to bring our own equipment, or will it be provided?",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Is there a specific deadline for registration, or can we sign up up until the day of the tournament?",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "What are the prize categories for the winners?",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Will there be any professional coaches or referees at the event?",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Is there a minimum number of players required for team sports like football?",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Can we register for more than one sport, or is it limited to just one event?",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "What are the event timings? Will it be a one-day tournament or span multiple days?",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Are there any fitness requirements or pre-event medical checks?",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Is there a registration fee, or is the event free to participate in?",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Will there be any facilities for participants like water stations or rest areas?",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "What are the rules for the basketball tournament? Will it be 3v3 or 5v5?",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Are there any special accommodations for people with disabilities?",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Can alumni participate in the tournament, or is it limited to current students?",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "How will the teams be organized for mixed-gender sports events?",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Are there going to be any cheerleaders or fan events for the audience?",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "What happens if a team member drops out at the last minute?",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Can we request a specific referee for a match?",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Will there be any social media coverage or live streaming of the tournament?",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Is there a backup plan in case of bad weather for outdoor events?",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "What is the process for submitting team rosters?",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Will there be any food stalls or refreshments available for participants?",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Are there any restrictions on the types of footwear or clothing we can wear during matches?",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Will there be a closing ceremony at the end of the tournament?",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "How do we handle disputes between teams during the event?",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Are there any workshops or skill-building sessions available before the tournament?",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Can spectators join in on any activities or is it strictly for participants?",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Is there a chance for networking with professionals in sports during the event?",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Will the event have any collaborations with local sports clubs?",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "How can we ensure our team is eligible for the prizes?",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Will the tournament feature any exhibition matches or celebrity games?",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Is there a limit on the number of teams that can register for each sport?",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Can we watch the games online if we can't attend in person?",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Are there any discounts or promotions for early registration?",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Will there be a health and safety briefing before the tournament begins?",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "How can we keep track of our team’s performance and schedule?",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Are there any special awards for the best team spirit or sportsmanship?",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Do we have to sign any waivers or agreements for participation?",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Will the games be played indoors or outdoors?",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Is there a rulebook available online for participants to review?",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "What are the official timings for registration?",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Can we form teams with people from different departments or do we need to stay within our own?",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Will the organizers provide transport for teams that need it?",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Are there going to be any fitness assessments prior to the event?",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Will there be any special recognition for record-breaking performances?",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Is there a contingency plan for unforeseen circumstances like injuries?",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "How will the teams be seeded for the tournament?",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Are there any social events or mixers for participants to get to know each other?",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Is there a possibility to exchange players between teams if needed?",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "What steps are being taken to ensure the event runs smoothly?",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Will there be an official photographer or videographer at the event?",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Is there any advice on how to prepare physically for the tournament?",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "How will weather conditions affect the schedule for outdoor events?",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Are there any early bird perks for signing up within the first week?",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "What time should we expect to arrive at the venue for the tournament?",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "How do we check the final bracket once the teams are confirmed?",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Can we update our team roster if we need to make changes before the event?",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Is there a minimum skill level required for each sport?",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Will there be any official merchandise available for purchase?",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "What happens if we need to forfeit a match during the tournament?",
        },
      ],
    },
    {
      title: "New Administrative Policy Announcements",
      main_post:
        "New Administrative Policy Announcements: The administration has rolled out new policies to improve operations and efficiency. These include updated guidelines on employee leave, updated work-from-home regulations, and the implementation of a new performance evaluation system. Please review the changes carefully and share your thoughts or any questions you may have about the new guidelines. We encourage everyone to stay informed and provide feedback.",
      group: "department",
      type: "announcement",
      user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
      replies: [
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "It's great to see the administration updating leave policies. I hope the new guidelines provide better clarity and flexibility for employees.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "I'm curious about the new performance evaluation system. Will there be more transparency in how feedback is given to employees?",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "The new work-from-home regulations could benefit employees who are balancing personal and work life. I’m eager to see how that works out in practice.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "The updated leave policy is a welcome change, but I think it would be great if the administration could provide more specific examples of acceptable circumstances for taking leave.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "With the new performance evaluation system, it’s important to ensure that employees have regular opportunities for feedback. Will there be more frequent reviews?",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "It would be helpful if the new work-from-home guidelines included suggestions for maintaining team collaboration. Virtual tools will be key.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "In terms of leave policies, will there be an option for paid leave in exceptional cases like family emergencies? It’s important to know how flexible the system will be.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Will the performance evaluation system have a peer review component? I think incorporating input from colleagues could provide a more holistic view of performance.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "I agree that clear guidelines around performance evaluation can lead to better employee satisfaction. It’ll be interesting to see if there’s a focus on individual development.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Will the new work-from-home regulations include details on how to handle office equipment at home? That would be useful to avoid confusion.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Another aspect to consider in performance evaluations is the balance between quantitative and qualitative feedback. Too much focus on numbers can be limiting.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "I’d love to see more flexibility in the leave policy to accommodate employees with young children or elder care responsibilities.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "For performance evaluations, it’s important to include a self-assessment component so employees can reflect on their own growth and development.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "I’m glad to see that the administration is moving forward with the updated policies. I hope they will allow for more customization based on specific departments' needs.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "With more people working remotely, it would be great to have some resources or guidelines on staying productive at home and managing distractions.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "I agree, guidelines on managing distractions while working from home will be essential for employees who struggle with maintaining focus.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "On the topic of performance evaluations, will there be a focus on goal setting for employees? Having clear goals can make evaluations much more effective.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "I think it would be important for the administration to explain how performance evaluations will directly affect career growth and promotions. Transparency will be key here.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Definitely! Clear communication on how performance impacts promotions would go a long way in reducing any ambiguity or frustration among employees.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "It would be helpful if the new work-from-home policy specified expectations for communication between employees and managers, especially for remote teams.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "I’m also curious if the leave policy will allow for flexible scheduling or if it will still follow the typical 9-to-5 framework. Flexibility in hours could improve work-life balance.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Flexibility in work hours would definitely improve productivity, especially for people who have different schedules or peak working hours.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "One thing I’d love to see in the performance evaluations is an emphasis on team collaboration. Teamwork is critical to success in many roles.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Good point! Evaluating collaboration can provide insights into an employee's ability to work with others, which is important in most work environments.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "It would be interesting to know how the leave policy will impact department-specific needs, like in departments that require more hands-on roles.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "I’m also wondering how the new policies will be implemented across different regions or locations. Will the changes be standardized, or are there adjustments for local laws?",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "That’s a good question. Understanding the geographical scope of the policies will be important for employees working in different regions with unique regulations.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "For performance evaluations, it’s crucial to ensure that the goals set for employees are achievable. Setting unrealistic expectations can lead to frustration.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Absolutely, goals should be specific and attainable. The evaluation system should focus on helping employees achieve their objectives, not just on meeting quotas.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "I would love it if the administration could provide some case studies or examples to better explain how the new performance evaluation system works in real-life scenarios.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Examples or case studies would certainly help clarify any confusion. It would also make it easier for employees to understand how their performance will be assessed.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "On the topic of work-from-home, it would be helpful if there were clear guidelines on how to request accommodations, such as for remote workspaces or tech equipment.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Great idea! Making the process of requesting accommodations clear and accessible will ensure employees feel supported in their remote work setup.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Definitely! A streamlined process for accommodations will make it easier for employees to feel comfortable and productive while working remotely.",
        },
      ],
    },
    {
      title: "Faculty Recruitment and Promotion Updates",
      main_post:
        "Faculty Recruitment and Promotion Updates: This thread discusses the recent updates and changes in our faculty recruitment process and promotion policies. Key updates include the introduction of new criteria for promotion, expansion of the recruitment pool to increase diversity, and adjustments to tenure-track timelines. We encourage faculty members, applicants, and colleagues to share their thoughts, experiences, and suggestions regarding these changes.",
      group: "department",
      type: "announcement",
      user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
      replies: [
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "I believe the new criteria for promotion will help ensure that a more diverse range of candidates is considered for advancement. However, it would be helpful to have more clarity on the specific metrics that will be used for evaluation.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "It's great to see the recruitment pool being expanded. Diversity brings in fresh perspectives and helps foster a more inclusive academic environment.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "I agree with the new recruitment strategies, but I think there should be more focus on providing mentorship to junior faculty during the promotion process. This can help them align with expectations more effectively.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "One area where I think we could improve is the transparency in how the promotion decisions are made. Having regular feedback loops and a clearer rubric would certainly help in this regard.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Adjusting tenure-track timelines is a good move, especially given the challenges we've seen with research and teaching loads in recent years. A more flexible timeline would allow faculty to better manage their responsibilities.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "I would love to see more focus on interdisciplinary research as a key component of promotion. Encouraging faculty to collaborate across departments could lead to groundbreaking work.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Another great addition would be recognizing contributions to student mentorship in the promotion process. It's an often overlooked aspect of faculty work that has significant impact on student success.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "The introduction of new criteria for promotion is a positive step forward. However, we need to ensure that the criteria are inclusive of all academic contributions, including teaching excellence, not just research output.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "I think it's important to also factor in community outreach and service as part of the promotion process. Many faculty members contribute in significant ways outside of the classroom and lab, and these efforts should be recognized.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "The recruitment pool expansion is key, but we also need to ensure that the hiring process remains competitive. We should continue to attract top talent from across the globe, but also prioritize finding candidates who align with the university's mission and values.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "What about tenure track for adjuncts or non-tenured faculty? It would be great if there were clearer paths for these individuals to gain more permanent positions within the university.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Tenure-track options for adjuncts could definitely help retain high-quality faculty. Perhaps we could introduce a more formal review process to identify adjuncts who are consistently excelling and give them more opportunities for permanent positions.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "It might also be beneficial to create more funding opportunities for junior faculty to support their research initiatives. This could make a significant difference when competing for promotion.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "The new policy could benefit from a clearer distinction between research-focused and teaching-focused promotions. Each track has its unique challenges, and it's important to have separate expectations for each.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "We should also think about providing more flexibility in how faculty members can fulfill their promotion requirements. Maybe there could be a system that recognizes accomplishments in a variety of ways rather than following a strict template.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "I think the recruitment process could benefit from incorporating more peer-reviewed assessments. Having colleagues from other institutions weigh in on a candidate’s research would add an extra layer of credibility to the process.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "It would be useful to integrate more data-driven approaches into faculty recruitment. For instance, analyzing the long-term impact of a faculty member's research output or student engagement could provide valuable insights for promotion decisions.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "A more structured mentorship program could help new faculty adjust to the tenure-track process. Having established mentors to guide them through the promotion criteria would ensure they are on the right track.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "I would like to see a clearer breakdown of how research funding influences promotion. If a faculty member consistently secures grants and contributes to their field, this should be recognized more explicitly.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "It’s essential that we maintain a balance between academic freedom and the requirements for promotion. Faculty should feel empowered to pursue unconventional research ideas without fear of being penalized for it.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "What about increasing collaboration between different departments as part of the promotion process? It could encourage interdisciplinary research that could have broader impacts.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "I completely agree. Cross-departmental collaborations often lead to innovative solutions that would not have been possible in isolation. We should incentivize this through promotion policies.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "While the promotion criteria are evolving, I hope we can maintain a focus on teaching excellence. Research is crucial, but teaching is at the heart of the university’s mission.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "I also believe that promoting work-life balance for faculty members can play a crucial role in improving productivity and well-being, which should be considered as part of the promotion process.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "Perhaps we could also explore more community engagement as part of the promotion process. Faculty who actively engage with the local community should be recognized for their contributions outside of the university.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Along with diversity in recruitment, we must also ensure that we create an inclusive environment that supports faculty from all backgrounds. Policies around promotion should reflect this commitment.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "It would be great to see more efforts directed towards encouraging faculty to explore new teaching methods and technologies, especially in today’s digital-first world.",
        },
        {
          user_id: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
          text: "I am curious to know if there will be any flexibility in the requirements for promotion in light of COVID-19 and its impact on faculty work. Many faculty members have had to adapt in extraordinary ways.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Yes, that’s an excellent point. The pandemic has changed the landscape of teaching and research. A flexible approach to promotion would allow for greater understanding of these challenges.",
        },
      ],
    },
  ],

  // custom group discussions
  customGroup: [
    {
      name: "Final Year Project",
      title: "FYP Discussions: Implementing AI-Based Recommendation Systems",
      main_post:
        "In this thread, we discuss the challenges and strategies involved in implementing AI-based recommendation systems for FYPs. Topics include choosing the right algorithms (e.g., collaborative filtering, content-based filtering, hybrid models), handling large datasets, ensuring system scalability, evaluating model performance, and dealing with biases in recommendations. Share your thoughts, experiences, and insights into how you plan to approach this project or any obstacles you’ve encountered.",
      user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
      members: [
        "user_2rDiMkoawYFUG8v331LR2xTuGFb",
        "user_2rDujCi7vz6cmoCus27URk3HRLE",
      ],
      replies: [
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "For an AI-based recommendation system, I believe hybrid models that combine both collaborative filtering and content-based filtering are the most effective in overcoming the weaknesses of each method individually.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "I’m focusing on dataset quality for my FYP. For recommendation systems, having a clean, well-structured dataset is crucial for building accurate models. Have you guys considered using user-item interaction matrices?",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Yes, I think preprocessing and cleaning data is one of the most time-consuming aspects of building a recommendation system. I’m considering using matrix factorization techniques for this.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "I’ve heard that implicit feedback (like clicks or views) can sometimes work better than explicit feedback (ratings). Are you planning to incorporate implicit feedback into your system?",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "I think hybrid models are great too. But what about dealing with cold-start problems, especially when you don’t have enough user data to start with?",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Cold-start problems are a big challenge. One way I’m tackling it is by implementing content-based filtering initially, where recommendations are based on the content that users interact with, even with minimal interaction history.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Great approach! Another technique to solve cold-start is using demographic data to enhance recommendations. This can help make the system more personalized from the get-go.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "I’m also thinking about how to evaluate the model's performance. Have you considered using precision, recall, and F1 score? Or do you have a different evaluation strategy?",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "I plan to use precision, recall, and F1 score, but I’m also going to implement Mean Average Precision at K (MAP@K) as it’s particularly useful for recommendation systems.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "MAP@K is a solid metric for ranking recommendations. I’d also suggest using the Root Mean Squared Error (RMSE) to measure the accuracy of predicted ratings if you're using a collaborative filtering approach.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "I’m focusing a lot on the scalability of my model. Are you guys thinking about how to scale up if the number of users or items grows exponentially?",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Scalability is crucial. For large datasets, I plan to implement matrix factorization with stochastic gradient descent (SGD) to ensure the model can scale efficiently. I’m also considering using Apache Spark for distributed computing.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "That’s a great idea! Spark could handle large datasets well. I’m also considering using TensorFlow for building the recommendation models. It offers good support for large-scale machine learning tasks.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Do you think incorporating deep learning techniques like neural collaborative filtering (NCF) would improve recommendation quality?",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "I definitely think deep learning can improve results, especially when dealing with large and complex datasets. NCF combines the strengths of neural networks and collaborative filtering, so it's worth exploring.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "NCF is promising for sure. However, I’d be careful with overfitting. Deep learning models can be prone to it, especially with limited data, so regularization techniques will be important.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "That’s a good point. I plan to use dropout and L2 regularization to prevent overfitting in my model. I’m also looking into transfer learning to leverage pre-trained models.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Transfer learning sounds like a great way to get a head start. You could adapt pre-trained models to fit the recommendation task with relatively less training data.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "I’ve been thinking about incorporating feedback loops where the model learns from users' ongoing behavior. This could make the recommendations more dynamic and up-to-date.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Feedback loops would be key in keeping the system relevant. Are you guys considering real-time recommendation updates based on new user interactions?",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Real-time updates would definitely add value, but they would also increase system complexity. I’m thinking of implementing batch updates at fixed intervals to strike a balance between performance and timeliness.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Batch updates sound like a sensible approach to start with. Once the model is stable, you could explore real-time updates without compromising performance.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "I’m also looking into bias and fairness in my model. Ensuring that the recommendations are not reinforcing harmful biases will be important.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Bias mitigation is critical. I’m planning to audit the model outputs regularly and use fairness constraints in the training process to ensure equal representation across different user groups.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Ensuring fairness should be a top priority. It would also be useful to test the system with various user demographics to check for unintended bias.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "In terms of user engagement, I think offering personalized recommendations based on their previous behavior, interests, and demographics could significantly boost satisfaction.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Absolutely! Personalization is key. I'm also considering integrating contextual data (such as time of day or location) to make recommendations even more relevant.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Contextual recommendations are an exciting area to explore. Using additional data like weather conditions or user activity patterns could open up new possibilities.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Exactly! Including context like seasonality could make recommendations more timely. I'm also thinking about adding an option for users to provide feedback on their recommendations to fine-tune the system.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "User feedback is crucial for improving the system continuously. I’ll be using active learning techniques to refine the model based on feedback, so it can learn from the users in real-time.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Active learning is a great idea! It will ensure the model gets more diverse input over time, improving the recommendations significantly.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "For scalability, I’m thinking of using cloud-based infrastructure. Have you guys considered deploying your models on platforms like AWS or Google Cloud?",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "I plan to deploy on AWS. Their SageMaker service could be really useful for training and deploying the recommendation models with great scalability.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "AWS is definitely a solid choice for deployment. I’m also looking into using Docker containers for packaging my model, so it’s easy to scale and manage in the cloud.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Docker containers would be great for portability and scalability. I’m considering Kubernetes for orchestration, especially if I need to manage multiple services.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Kubernetes is perfect for managing containers at scale. It would allow us to manage model updates and deployments seamlessly.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Definitely. Kubernetes would make the system more robust. I’m also exploring using a microservices architecture to separate different components of the recommendation system.",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "I think microservices is a great approach for modularizing the recommendation system. It makes updating and scaling each part of the system much easier.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "Microservices definitely adds flexibility. I’m planning to separate the data preprocessing, recommendation generation, and user feedback processing into different services for easier maintenance.",
        },
        {
          user_id: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
          text: "That’s exactly how I’m structuring my system too. It’ll be much easier to scale individual parts when needed. Good luck with your projects, everyone!",
        },
        {
          user_id: "user_2rDujCi7vz6cmoCus27URk3HRLE",
          text: "Good luck to you as well! It’s been great discussing these ideas with you all. Looking forward to seeing how your FYPs turn out.",
        },
      ],
    },
  ],
};
