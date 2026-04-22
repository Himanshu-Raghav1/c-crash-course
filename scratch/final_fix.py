
import sys

file_path = "src/data/assignmentData.tsx"

with open(file_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

# A10 starts around line 492 (index 491)
# I want to find the exact line for 'A10': {
start_idx = -1
for i, line in enumerate(lines):
    if "'A10': {" in line:
        start_idx = i
        break

if start_idx == -1:
    print("Could not find A10 start")
    sys.exit(1)

# I want to find the end of the assignmentData object (before simulations)
end_idx = -1
for i in range(len(lines)-1, 0, -1):
    if "};" in lines[i] and "assignmentData = {" not in lines[i]:
        end_idx = i
        break

if end_idx == -1:
    print("Could not find assignmentData end")
    sys.exit(1)

new_content = """  'A10': {
    id: 'A10',
    title: 'Assignment 10',
    flowchart: `graph TD
    Start([Start]) --> Input[/Accept operation op/]
    Input --> OpPlus{op = +?}
    OpPlus -- yes --> InAB1[/Accept a & b/] --> DispAdd[/Display a + b/]
    OpPlus -- no --> OpMinus{op = -?}
    OpMinus -- yes --> InAB2[/Accept a & b/] --> DispSub[/Display a - b/]
    OpMinus -- no --> OpMul{op = *?}
    OpMul -- yes --> InAB3[/Accept a & b/] --> DispMul[/Display a * b/]
    OpMul -- no --> OpDiv{op = /?}
    OpDiv -- yes --> InAB4[/Accept a & b/] --> DispDiv[/Display a / b/]
    OpDiv -- no --> OpPow{op = ^?}
    OpPow -- yes --> InAB5[/Accept a & b/] --> Pow0{b = 0?}
    Pow0 -- yes --> DispPow1[/Display 1/]
    Pow0 -- no --> DispPowR[/Display a ^ b/]
    OpPow -- no --> OpFact{op = !?}
    OpFact -- yes --> InA[/Accept a/] --> FactNeg{a < 0?}
    FactNeg -- yes --> DispErr[/Display Error/]
    FactNeg -- no --> DispFact[/Display a!/]
    OpFact -- no --> DispErr
    DispAdd --> Stop([Stop])
    DispSub --> Stop
    DispMul --> Stop
    DispDiv --> Stop
    DispPow1 --> Stop
    DispPowR --> Stop
    DispFact --> Stop
    DispErr --> Stop`,
    ps: "Write a program in C to simulate a simple calculator that performs basic arithmetic operations  such  as addition,  subtraction,  multiplication,  and division.  The calculator  should also perform  special  operations  like computing  xʸ (power)  and x! (factorial).",
    objective: "• To understand  the use of switch -case  statements  in C. • To perform  basic  arithmetic  and special  mathematical  operations. • To enhance  problem -solving  skills  using  menu -driven  programs.",
    algorithm: [
      "START",
      "Accept  operation  input",
      "Accept  the required  amount  of numbers",
      "Check  for illegal  cases  (division  by zero,  negative  factorial)",
      "Perform given operation",
      "Display  results",
      "STOP"
    ],
    io: { input: "^ 5 3", output: " " },
    conclusion: "Thus,  a simple  calculator  program  was successfully  implemented  using  C programming.  The program demonstrates the use of switch -case statements, loops, and arithmetic operations.",
    code: `#include <stdio.h>
#include <math.h>

long long fact(long long n) {
    if (n <= 1) return 1;
    return (n * fact(n - 1));
}

int main() {
    char op;
    printf("Enter Operation: \\n+, -, *, /, ^, !\\n");
    scanf(" %c", &op);
    int a, b;
    if (op != '!') {
        printf("Enter 2 numbers : ");
        scanf("%d %d", &a, &b);
    } else {
        printf("Enter 1 number : ");
        scanf("%d", &a);
    }
    switch (op) {
        case '+': printf("%d", a + b); break;
        case '-': printf("%d", a - b); break;
        case '*': printf("%d", a * b); break;
        case '/': printf("%d", a / b); break;
        case '^': printf("%.2f", pow(a, b)); break;
        case '!': printf("%lld", fact(a)); break;
    }
}`
  },
  'A11': {
    id: 'A11',
    title: 'Assignment 11',
    flowchart: `graph TD
    Start([Start]) --> In[/Accept n/]
    In --> Dsqrt[/Display sqrt n/]
    Dsqrt --> Dsq[/Display n^2/]
    Dsq --> Dcube[/Display n^3/]
    Dcube --> InitP[i = 2]
    InitP --> Divi{n is divisible by i?}
    Divi -- yes --> NotP[/Display not prime/]
    Divi -- no --> CondP{i > sqrt n ?}
    CondP -- no --> NextI[i = i + 1] --> Divi
    CondP -- yes --> DispP[/Display prime/]
    NotP --> InitF[i = 1, p = 1]
    DispP --> InitF
    InitF --> CalcF[p = p * i]
    CalcF --> CondF{i > n?}
    CondF -- no --> NextIF[i = i + 1] --> CalcF
    CondF -- yes --> DispF[/Display p as factorial/]
    DispF --> InitPF[i = 2]
    InitPF --> DivPF{n is divisible by i?}
    DivPF -- yes --> DispI[/Display i/] --> NewN[n = n / i] --> CondN{n > 1?}
    DivPF -- no --> NextIPF[i = i + 1] --> DivPF
    CondN -- yes --> InitPF
    CondN -- no --> Stop([Stop])`,
    ps: "Write  a program  in C to accept  a number  from the user and compute  the following: a) Square  root of the number b) Square  of the number c) Cube  of the number d) Check  whether  the number  is prime e) Factorial  of the number f) Prime  factors  of the number",
    objective: "• To understand  the use of mathematical  operations  in C. • To implement  loops  and conditional  statements . • To perform  number -based  computations. • To enhance  logical  thinking  using  menu -driven  programs.",
    algorithm: [
      "START",
      "Accept  a number",
      "Display  square  root of number",
      "Display square of number",
      "Display Cube of number",
      "Display primality of number",
      "Display factorial of number",
      "Display  prime  factors  of number",
      "STOP"
    ],
    io: { input: "12", output: " " },
    conclusion: "Thus, the program to perform various mathematical operations on a number was successfully  implemented  using  C programming.  This program  demonstrates  the use of loops, conditional statements, switch -case, and mathematical functions.",
    code: `#include <stdio.h>
#include <math.h>

int isPrime(int n) {
    if (n < 2) return 0;
    for (int i = 2; i <= sqrt(n); i++) {
        if (n % i == 0) return 0;
    }
    return 1;
}

int fact(int n) {
    if (n > 0) return n * fact(n - 1);
    return 1;
}

int main() {
    printf("Enter a number - ");
    int n;
    scanf("%d", &n);
    printf("Square Root - %f\\\\nSquare of the number - %d\\\\nCube of the number - %d\\\\nIs number Prime - %s\\\\nFactorial of number - %d\\\\nPrime Factors of the number - ", sqrt(n), n * n, n * n * n, (isPrime(n) ? "Yes" : "No"), fact(n));
    
    int temp = n;
    while (temp > 1) {
        for (int i = 2; i <= temp; i++) {
            if (temp % i == 0) {
                printf("%d ", i);
                temp /= i;
                break;
            }
        }
    }
}`
  },
  'A12': {
    id: 'A12',
    title: 'Assignment 12',
    flowchart: `graph TD
    Start([Start]) --> In[/Accept a and b/]
    In --> SwapCond{a < b?}
    SwapCond -- yes --> Swap[Swap a and b]
    SwapCond -- no --> GCDCond{b = 0?}
    Swap --> GCDCond
    GCDCond -- no --> Calc[a = b, b = a % b] --> GCDCond
    GCDCond -- yes --> Disp[/Display a as gcd/]
    Disp --> Stop([Stop])`,
    ps: "Write  a program  in C to accept  two numbers  from the user and compute: a) The smallest  common  divisor  of the two numbers  (other  than 1, if any) b) The Greatest  Common  Divisor  (GCD)  of the two numbers",
    objective: "• To understand  the use of mathematical  operations  in C. • To implement  loops  and conditional  statements . • To perform  number -based  computations. • To enhance  logical  thinking  using  menu -driven  programs.",
    algorithm: [
      "START",
      "Accept  numbers  a & b (with  b being  the smaller  number)",
      "If b is 0, GCD is a",
      "Set a as b and b as the remainder of a/b",
      "Repeat  steps  3 & 4 until GCD  is obtained",
      "Display GCD"
    ],
    io: { input: "27 63", output: "" },
    conclusion: "Thus,  the program  to find the smallest  common  divisor  and the Greatest  Common  Divisor  of two numbers was successfully implemented using C programming. This program demonstrates the use of loops, conditional statements, and the Euclidean algorithm.",
    code: `#include <stdio.h>

int GCD(int a, int b) {
    if (b == 0) return a;
    return (GCD(b, a % b));
}

int main() {
    printf("Enter 2 numbers - ");
    int a, b;
    scanf("%d %d", &a, &b);
    printf("GCD - %d", GCD(a, b));
}`
  },
  'A13': {
    id: 'A13',
    title: 'Assignment 13',
    flowchart: `graph TD
    Start([Start]) --> In[/Accept n/]
    In --> Init[m = 0]
    Init --> Cond{n = 0?}
    Cond -- no --> Calc[m = 10m + n % 10, n = n / 10] --> Cond
    Cond -- yes --> Disp[/Display m/]
    Disp --> Stop([Stop])`,
    ps: "Write  a program  in C to accept  a number  from the user and print the digits  of the number  in reverse order.",
    objective: "• To understand  number  manipulation  using  loops . • To learn  the use of modulo  (%) and division  (/) operators. • To implement  logic for reversing  digits  of a number. • To improve  problem -solving  skills  using  iterative  structures.",
    algorithm: [
      "START",
      "Accept  number  n",
      "Iterate  through  each  digit of n starting  from the unit digit while  adding  it to m",
      "Display  m",
      "STOP"
    ],
    io: { input: "123", output: "" },
    conclusion: "Thus, the program to print the digits of a number in reverse order was successfully implemented  using  C programming.  The program  demonstrates  the effective  use of loops, modulo operator, and division operator.",
    code: `#include <stdio.h>

int reverse(int n) {
    int m = 0;
    while (n > 0) {
        m = 10 * m + n % 10;
        n /= 10;
    }
    return m;
}

int main() {
    printf("Enter a number - ");
    int n;
    scanf("%d", &n);
    printf("Reverse number - %d", reverse(n));
}`
  },
  'A14': {
    id: 'A14',
    title: 'Assignment 14',
    flowchart: `graph TD
    Start([Start]) --> In[/Accept binary number b/]
    In --> Init[i = 0, sum = 0]
    Init --> Cond{b = 0?}
    Cond -- no --> Calc[sum = sum + b % 10 * 2^i, i = i + 1, b = b / 10] --> Cond
    Cond -- yes --> Disp[/Display sum/]
    Disp --> Stop([Stop])`,
    ps: "",
    objective: "To understand  number  system  conversions. To learn  how to convert  binary  numbers  to decimal  numbers  in C. To practice the use of loops and arithmetic operations. To develop  logical  thinking  for number  system  problems.",
    algorithm: [
      "START",
      "Accept  binary  number",
      "Iterate  through  binary  number  and add digit times  2^place  value  to a variable  sum",
      "Display sum",
      "STOP"
    ],
    io: { input: "100101", output: "" },
    conclusion: "Thus,  the C program  successfully  converts  a binary  number  entered  by the user into its decimal equivalent using loops and arithmetic operations.",
    code: `#include <stdio.h>
#include <math.h>

int bintodec(int b, int n) {
    if (b == 0) return 0;
    return b % 10 * pow(2, n) + bintodec(b / 10, ++n);
}

int main() {
    int n;
    printf("Enter Binary Number - ");
    scanf("%d", &n);
    printf("Decimal Number - %d", bintodec(n, 0));
}`
  },
  'A15': {
    id: 'A15',
    title: 'Assignment 15',
    ps: "Write  a C program  to generate  pseudo  random  numbers.",
    objective: "To understand  the concept  of pseudo  random  numbers. To learn the use of rand() and srand() functions in C. To generate  random  numbers  using  the standard  library. To understand  the role of header  files in C programming.",
    algorithm: [
      "START",
      "Accept  no. of numbers  to be generated  n.",
      "Generate  and display  n pseudo -random  numbers.",
      "STOP"
    ],
    io: { input: "5", output: "" },
    conclusion: "Thus,  the C program  successfully  generates  pseudo  random  numbers  using the rand() function and srand() for seeding.",
    code: `#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main() {
    srand(time(NULL));
    printf("Enter number of numbers - ");
    int n;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        printf("%d \\\\n", rand());
    }
}`
  },
  'A16': {
    id: 'A16',
    title: 'Assignment 16',
    flowchart: `graph TD
    Start([Start]) --> In[/Accept array A/]
    In --> Init[i = 0, Array ODD and EVEN as empty]
    Init --> Cond{is A[i] odd?}
    Cond -- yes --> AddO[Add A[i] to ODD]
    Cond -- no --> AddE[Add A[i] to EVEN]
    AddO --> NextI[i = i + 1]
    AddE --> NextI
    NextI --> LenCond{i = length of A?}
    LenCond -- no --> Cond
    LenCond -- yes --> Disp[/Display ODD and EVEN/]
    Disp --> Stop([Stop])`,
    ps: "To accept  a list of N integers  and partition  the list into two sublists containing even and odd numbers.",
    objective: "To understand  how to work  with arrays  in C. To learn  how to separate  numbers  based  on conditions. To practice  the use of loops  and conditional  statements. To display  two different  lists for even  and odd numbers.",
    algorithm: [
      "START",
      "Accept  array  of numbers  A",
      "Create  empty  arrays  called  ODD  and EVEN",
      "Iterate  through  A and add odd numbers  to ODD  and even  numbers  to EVEN.",
      "Display ODD and EVEN",
      "STOP"
    ],
    io: { input: "1 2 3 4 5", output: "." },
    conclusion: "Thus,  the C program  successfully  accepts  a list of integers  and partitions them into two separate lists of even and odd numbers.",
    code: `#include <stdio.h>

int main() {
    printf("Enter size of array - ");
    int n;
    scanf("%d", &n);
    int A[n];
    printf("Enter elements of array\\\\n");
    for (int i = 0; i < n; i++) {
        scanf("%d", &A[i]);
    }
    int ODD[n], EVEN[n];
    int oc = 0, ec = 0;
    for (int i = 0; i < n; i++) {
        if (A[i] % 2 != 0) ODD[oc++] = A[i];
        else EVEN[ec++] = A[i];
    }
    printf("ODD - ");
    for (int i = 0; i < oc; i++) {
        printf("%d ", ODD[i]);
    }
    printf("\\\\nEVEN - ");
    for (int i = 0; i < ec; i++) {
        printf("%d ", EVEN[i]);
    }
}`
  },
  'A17': {
    id: 'A17',
    title: 'Assignment 17',
    flowchart: `graph TD
    Start([Start]) --> ReadX[/Read x in radians/]
    ReadX --> ReadN[/Read n number of terms/]
    ReadN --> Init[sum = 0]
    Init --> Loop{i = 1 to n}
    Loop -- Yes --> Calc["sum += ((-1)^(i+1) * x^(2i-1)) / (2i-1)!"]
    Calc --> NextI[i = i + 1] --> Loop
    Loop -- No --> Print[/Print Sum/]
    Print --> End([End])`,
    ps: "To accept  the number  of terms  and find the sum of the sine series.",
    objective: "• To understand  the concept  of mathematical  series  in programming. • To implement  sine series  using  C programming. • To practice  loops  and arithmetic  operations. • To learn  the use of factorial  and power  calculations  in C.",
    algorithm: [
      
    ],
    io: { input: "1 5", output: "" },
    conclusion: "Thus,  the C program  successfully  calculates  the sum of the sine series  for the given  number of terms.",
    code: `#include <stdio.h>
#include <math.h>

float fact(int n) {
    if (n > 0) return n * fact(n - 1);
    return 1;
}

int main() {
    float x;
    int n;
    printf("Enter x (in radians) : ");
    scanf("%f", &x);
    printf("Enter number of terms : ");
    scanf("%d", &n);
    float sum = 0;
    for (int i = 1; i <= n; i++) {
        sum += pow(-1, i + 1) * (float)pow(x, ((2 * i) - 1)) / fact((2 * i) - 1);
    }
    printf("Sum = %f", sum);
}`
  },
  'A18': {
    id: 'A18',
    title: 'Assignment 18',
    flowchart: `graph TD
    Start([Start]) --> ReadA[/Read String A/]
    ReadA --> Len[Calculate Length of A]
    Len --> Rev[Reverse String A]
    Rev --> ReadB[/Read String B/]
    ReadB --> Eq{A equals B?}
    Eq -- Yes --> PrintEq[/Print A and B are same/]
    Eq -- No --> Pal{A is a palindrome?}
    Pal -- Yes --> PrintPal[/Print A is a palindrome/]
    Pal -- No --> Sub{B is a substring of A?}
    Sub -- Yes --> PrintSub[/Print B is a substring of A/]
    PrintEq --> End([End])
    PrintPal --> End
    PrintSub --> End
    Sub -- No --> End`,
    ps: "Write  a C program  that accepts  a string  from the user and performs  the following  string operations: i) Calculate  length  of string ii) String  reversal iii) Equality  check  of two strings iv) Check  palindrome v) Check  substring.",
    objective: "• To understand  basic  string  operations  in C. • To learn  how to manipulate  strings  using  loops  and functions. • To perform  comparison,  reversal,  and substring  checking. • To check  whether  a string  is a palindrome.",
    algorithm: [
      
    ],
    io: { input: "ABC ABC", output: "" },
    conclusion: "Thus,  the C program  successfully  performs  different  string  operations  such  as length calculation, reversal, equality check, palindrome check, and substring detection.",
    code: `#include <stdio.h>
#include <string.h>

void reverse(int n, char ver[n], char rev[n]) {
    for (int i = 0; i < n - 1; i++) {
        rev[n - i - 2] = ver[i];
    }
    rev[n - 1] = 0;
}

int main() {
    char A[50];
    printf("Enter String A: ");
    fgets(A, 50, stdin);
    char revA[strlen(A)];
    reverse(strlen(A), A, revA);
    char B[50];
    printf("Enter String B: ");
    fgets(B, 50, stdin);
    printf("Length of A = %lu\\\\nReversed A is %s\\\\nA and B are %s\\\\nA is %sa palindrome \\\\nB is %sa substring of A", strlen(A), revA, (strcmp(A, B) == 0 ? "Same" : "Different"), (strcmp(A, revA) == 0 ? "" : "not "), (strstr(A, B) != NULL ? "" : "not "));
}`
  },
  'A19': {
    id: 'A19',
    title: 'Assignment 19',
    flowchart: `graph TD
    Start([Start]) --> InN[/Input n number of employees/]
    InN --> Init[Initialize: male = 0, highsalary = 0]
    Init --> Loop[FOR i = 0 to n-1]
    Loop --> InDetails[/Input: name, designation, gender, date, salary/]
    InDetails --> Gen{Is gender == 'm'?}
    Gen -- Yes --> IncM[male = male + 1]
    Gen -- No --> Sal{salary > 10000?}
    Sal -- Yes --> IncH[highsalary = highsalary + 1]
    IncM --> Rep[Repeat loop]
    IncH --> Rep
    Sal -- No --> Rep
    Rep --> Loop
    Loop -- Done --> Print[/Print: Total n, Male, Female, High Salary/]
    Print --> DestLoop[FOR i = 0 to n-1]
    DestLoop --> Dest{Is designation == 'AsstManager'?}
    Dest -- Yes --> PrintName[/Print employee name/] --> RepD[Repeat loop]
    Dest -- No --> RepD
    RepD --> DestLoop
    DestLoop -- Done --> End([End])`,
    ps: `Create  Structure  EMPLOYEE  for storing  details  (Name,  Designation,  gender,  Date  of Joining 
and Salary). Define function members to compute:  
a) total number  of employees  in an organization  
b) count  of male  and female  employee  
c) Employee  with salary  more  than 10,000  
d) Employee  with designation  “Asst  Manager”`,
    objective: `• To understand  the use of structures  in C programming.  
• To store  and manage  employee  records  using  structures.  
• To perform  operations  such  as counting  and filtering  employee  data`,
    algorithm: [
      
    ],
    io: { input: "2 Name AsstManager m 1 2 Name2 Manager f 1 2", output: "" },
    conclusion: "Thus, the C program successfully demonstrates the use of structures to store employee details and perform various operations such as counting employees, identifying employees with salary greater than 10,000, and displaying employees with the designation 'Asst Manager'.",
    code: `#include <stdio.h>
#include <string.h>

struct employee {
    char name[50];
    char designation[50];
    char gender;
    int date;
    int salary;
};

int main() {
    printf("Enter number of employees: ");
    int n;
    scanf("%d", &n);
    struct employee employees[n];
    int highsalary = 0;
    int male = 0;
    for (int i = 0; i < n; i++) {
        printf("Enter name: ");
        scanf(" %[^\\\\n]s", employees[i].name);
        printf("Enter designation: ");
        scanf(" %[^\\\\n]s", employees[i].designation);
        printf("Enter gender (m/f), date of joining and salary: ");
        scanf(" %c %d %d", &employees[i].gender, &employees[i].date, &employees[i].salary);
        if (employees[i].gender == 'm') male++;
        if (employees[i].salary > 10000) highsalary++;
    }
    printf("Male Employees = %d\\\\nFemale Employees = %d\\\\nEmployees with salary over 10000 = %d\\\\nEmployees with designation AsstManager:\\\\n", male, n - male, highsalary);
    for (int i = 0; i < n; i++) {
        if (strcmp(employees[i].designation, "AsstManager") == 0)
            printf("%s\\\\n", employees[i].name);
    }
}`
  },
  'A20': {
    id: 'A20',
    title: 'Assignment 20',
    flowchart: `graph TD
    Start([Start]) --> In[/Enter two numbers/]
    In --> Read[/Read a and b/]
    Read --> Choice{Choose Method}
    Choice --> NoPtr[Swap without pointers]
    Choice --> WithPtr[Swap with pointers]
    NoPtr --> S1[c = b] --> S2[b = a] --> S3[a = c] --> Print1[/Print a and b/] --> End([End])
    WithPtr --> P1["*c = *b"] --> P2["*b = *a"] --> P3["*a = *c"] --> Print2[/Print a and b/] --> End`,
    ps: "Write  a C function  to swap  two numbers  with and without  using  pointers.",
    objective: `• To understand  the concept  of function  calls in the C programming  language.  
• To learn  the difference  between  call by value  and call by reference.  
• To demonstrate  swapping  of two numbers  with and without  pointers.`,
    algorithm: [
      
    ],
    io: { input: "2 5", output: "" },
    conclusion: `Thus,  the C program  successfully  demonstrates  the difference  between  swapping  values 
using  call by value  and call by reference.  Using  pointers  allows  the function  to modify  the 
original variables directly.`,
    code: `#include <stdio.h>

void swapvar(int a, int b) {
    int temp = b;
    b = a;
    a = temp;
    printf("After swapping without pointers:\\\\na = %d, b = %d\\\\n", a, b);
}

void swappoint(int *a, int *b) {
    int temp = *b;
    *b = *a;
    *a = temp;
    printf("After swapping with pointers:\\\\na = %d, b = %d\\\\n", *a, *b);
}

int main() {
    printf("Enter two numbers: ");
    int a, b;
    scanf("%d %d", &a, &b);
    swapvar(a, b);
    swappoint(&a, &b);
}`
  },
  'A21': {
    id: 'A21',
    title: 'Assignment 21',
    flowchart: `graph TD
    Start([Start]) --> OpenA[Open FileA.txt for reading]
    OpenA --> OpenB[Open FileB.txt for writing]
    OpenB --> Read{Read a line from FileA.txt}
    Read -- Yes --> Write[Write line to FileB.txt] --> Read
    Read -- No --> Close[Close files]
    Close --> End([End])`,
    ps: "Write  a C program  to copy  contents  of one file to another  using  file handling.",
    objective: `• To understand  the concept  of file handling  in the C programming  language.  
• To learn  how to read data from a file and write  data into another  file. 
• To implement  file copy  operation  using  standard  file handling  functions.`,
    algorithm: [
      
    ],
    io: { input: "", output: "" },
    conclusion: `Thus,  the C program  successfully  demonstrates  file handling  operations  by copying  the 
contents of one file into another using file handling functions.`,
    code: `#include <stdio.h>

int main() {
    FILE *f1 = fopen("FileA.txt", "r");
    FILE *f2 = fopen("FileB.txt", "w");
    if (f1 == NULL || f2 == NULL) {
        printf("Error opening files!\\\\n");
        return 1;
    }
    char content[200];
    while (fgets(content, 200, f1) != NULL) {
        fprintf(f2, "%s", content);
    }
    fclose(f1);
    fclose(f2);
    printf("File copied successfully.\\\\n");
    return 0;
}`
  },
  'A22': {
    id: 'A22',
    title: 'Assignment 22',
    ps: `Write  a menu  driven  program  in C to perform  various  string  operations  using  in-built 
functions.`,
    objective: `• To understand  the concept  of strings  in the C programming  language.  
• To learn  how to use built-in string  functions  for string  manipulation.  
• To perform  operations  such  as length  calculation,  copying,  concatenation,  comparison, 
and reversal using menu options.`,
    algorithm: [
      
    ],
    io: { input: `STrING  
a 
2`, output: " " },
    conclusion: `Thus, the C program successfully demonstrates different string operations using built -in 
functions  through  a menu  driven  approach,  making  the program  interactive  and easy  to use.`,
    code: `#include <stdio.h>
#include <string.h>

void reverse(int n, char ver[n], char rev[n]) {
    for (int i = 0; i < n - 1; i++) {
        rev[n - i - 2] = ver[i];
    }
    rev[n - 1] = 0;
}

int main() {
    char A[50], B[50];
    printf("Enter String A: ");
    fgets(A, 50, stdin);
    A[strcspn(A, "\\\\n")] = 0;
    printf("Enter String B: ");
    fgets(B, 50, stdin);
    B[strcspn(B, "\\\\n")] = 0;
    
    char revA[50], revB[50];
    reverse(strlen(A) + 1, A, revA);
    reverse(strlen(B) + 1, B, revB);

    printf("1 - Length\\\\n2 - Copy\\\\n3 - Compare\\\\n4 - Concat\\\\n5 - Reverse\\\\nEnter choice: ");
    int c;
    scanf("%d", &c);
    switch (c) {
        case 1: printf("Length of A - %lu\\\\nLength of B - %lu", strlen(A), strlen(B)); break;
        case 2: strcpy(B, A); printf("A - %s\\\\nB - %s", A, B); break;
        case 3: printf("A and B are %s", (strcmp(A, B) == 0 ? "Same" : "Different")); break;
        case 4: strcat(A, B); printf("A - %s", A); break;
        case 5: printf("A - %s, B - %s", revA, revB); break;
        default: printf("Error");
    }
    return 0;
}`
  }
"""

fixed_lines = lines[:start_idx] + [new_content] + lines[end_idx:]

with open(file_path, "w", encoding="utf-8") as f:
    f.writelines(fixed_lines)
