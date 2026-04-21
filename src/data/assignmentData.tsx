import React from 'react';
import { LeapYearSim } from '../components/LeapYearSim';
import { CalculatorSim } from '../components/CalculatorSim';
import { TableSim } from '../components/TableSim';
import { SalarySim } from '../components/SalarySim';

export interface Assignment {
  id: string;
  title: string;
  ps: string;
  objective: string;
  algorithm: string[];
  io: { input: string; output: string };
  conclusion: string;
  code: string;
  sim?: React.ReactNode;
}

export const assignmentsOverview = [
  { id: 'A1', title: 'Assignment 1' },
  { id: 'A2', title: 'Assignment 2' },
  { id: 'A3', title: 'Assignment 3' },
  { id: 'A4', title: 'Assignment 4' },
  { id: 'A5', title: 'Assignment 5' },
  { id: 'A6', title: 'Assignment 6' },
  { id: 'A7', title: 'Assignment 7' },
  { id: 'A8', title: 'Assignment 8' },
  { id: 'A9', title: 'Assignment 9' },
  { id: 'A10', title: 'Assignment 10' },
  { id: 'A11', title: 'Assignment 11' },
  { id: 'A12', title: 'Assignment 12' },
  { id: 'A13', title: 'Assignment 13' },
  { id: 'A14', title: 'Assignment 14' },
  { id: 'A15', title: 'Assignment 15' },
  { id: 'A16', title: 'Assignment 16' },
  { id: 'A17', title: 'Assignment 17' },
  { id: 'A18', title: 'Assignment 18' },
  { id: 'A19', title: 'Assignment 19' },
  { id: 'A20', title: 'Assignment 20' },
  { id: 'A21', title: 'Assignment 21' },
  { id: 'A22', title: 'Assignment 22' }
];

export const assignmentData: Record<string, Assignment> = {

  'A1': {
    id: 'A1',
    title: 'Assignment 1',
    ps: "Write  a program  in C to check  whether  a given  year is a Leap  Year",
    objective: "To understand the use of conditional statements in C programming. To implement logical conditions for solving real-world problems. To develop problem-solving skills using decision control structures.",
    algorithm: [
      "START",
      "Accept  year n",
      "Check  if n is divisible  by 4 and if it is divisible  by 100 and if it is divisble  by 400",
      "If it is divisible by 4 but not by 100, or it is divisible by 400, display a leap year",
      "In any other case, display not a leap year",
      "STOP"
    ],
    io: { input: "2024", output: "" },
    conclusion: "Thus,  the program  successfully  checks  whether  a given  year is a Leap  Year  using conditional statements in C.",
    code: `#include  <stdio.h>  
 
void main(){ 
int n;  
printf("Enter  a Year  - "); 
scanf("%d",&n);  
if ((n%4  == 0 && n%100  != 0) || (n%400  == 0)){ 
printf("Leap  Year");  
} 
else{  
printf("Not  Leap  Year");  
} 
}`
  },
  'A2': {
    id: 'A2',
    title: 'Assignment 2',
    ps: "Write  a menu  driven  program  in C to implement  the basic  arithmetic  operations  such  as Addition, Subtraction, Multiplication, and Division.",
    objective: "• To understand  the concept  of menu  driven  programming  in C. • To apply  conditional  statements  and switch –case  control  structures. • To perform  basic  arithmetic  operations  using  user-defined  input. • To enhance  logical  thinking  and problem -solving  skills.",
    algorithm: [
      "START",
      "Accept  operation  input",
      "Accept two numbers a and b",
      "if input  was +, display  their sum",
      "if input  was -, display  their difference",
      "if input was *, display their product",
      "if input was /, display their quotient",
      "STOP"
    ],
    io: { input: "* 3 5", output: "" },
    conclusion: "Thus,  the menu  driven  program  in C successfully  performs  basic  arithmetic  operations  using switch –case statements.",
    code: `#include  <stdio.h>  
\n
void main()  
 
{ 
 
char n; 
 
printf("Enter  operation \n+ Addition \n- Subtraction \n* Multiplication \n/ Division \n"); 
scanf("%c", &n);  
printf("Enter  two numbers  : "); 
float a,b;  
scanf("%f  %f", &a, &b); 
switch(n){  
case  '+': 
 
printf("%f",  a+b); 
break;  
case  '-': 
 
printf("%f",  a-b); 
break;  
case  '*': 
 
printf("%f",  a*b); 
break;  
case  '/': 
 
printf("%f",  a/b); 
break;  
default:  
 
printf("Invalid  Input");  
 
} 
 
} \n`
  },
  'A3': {
    id: 'A3',
    title: 'Assignment 3',
    ps: "Write  a program  in C to generate  multiplication  tables  for a given  number.",
    objective: "• To understand  the use of looping  statements  in C. · To generate  multiplication  tables  using  loops. · To improve  program  logic and execution  flow understanding.",
    algorithm: [
      "START",
      "Accept number n",
      "Iterate  i from 1 to 20",
      "Each  iteration,  display  i × n",
      "STOP"
    ],
    io: { input: "5", output: " " },
    conclusion: "Thus,  the menu  driven  program  in C successfully  performs  basic  arithmetic  operations  using switch –case statements.",
    code: `#include  <stdio.h>  
 
 
 
void main(){ 
int n;  
printf("Enter  number  - "); 
scanf("%d",&n);  
for (int i = 1; i <=20; i++){ 
printf("%d  x %d = %d\n",n,i,n*i);  
} 
 
}`
  },
  'A4': {
    id: 'A4',
    title: 'Assignment 4',
    ps: "Write  a C Program  to calculate  the salary  of an employee  given  his basic  pay (taken  as input from the user). Calculate gross salary of employee. Let HRA be 10 % of basic pay and TA be 5% of basic pay. Let employees pay professional tax as 2% of  total salary. Calculate net salary payable after deductions.",
    objective: "To understand  the importance  of flowchart  for any programming  model. To learn simple flowchart symbols and arrows to define relationships. To understand  and develop  visual  representations  of flow of data.",
    algorithm: [
      "START",
      "Accept  Basic  Pay BP",
      "Define  HRA  as 0.1, TA as 0.05 and PT as 0.02",
      "Calculate  Gross  salary  using  formula:  BP×(1  - HRA  - TA)",
      "Calculate Total Pay using GS×(1 -PT)",
      "STOP"
    ],
    io: { input: "1500", output: "" },
    conclusion: "Thus,  we have  learned  to write  algorithms  and to draw  its representation  in terms of flowchart.",
    code: `#include  <stdio.h>  
 
 
 
int main()  
 
{ 
 
printf("Enter  Basic  Pay - "); 
float BP;  
scanf("%f",  &BP);  
 
float HRA  = 0.1, TA = 0.05,  PT = 0.02; 
float GS = BP*(1+HRA+TA);  
printf("Gross  Salary  - %f",GS  * (1-PT));  
 
}`
  },
  'A5': {
    id: 'A5',
    title: 'Assignment 5',
    ps: "Write  a program  in C to perform  basic  matrix  operations  such  as: 1. Addition  of two matrices 2. Saddle  point  of a matrix 3. Inverse  of a matrix 4. Magic  square  of a matrix",
    objective: "• To understand  matrix  representation  in C using  two-dimensional  arrays. • To implement  various  matrix  operations  using  C programming. • To develop  logical  thinking  for solving  matrix -based  problems.",
    algorithm: [
      "Start",
      "Read  the order  of the matrix",
      "Read  elements  of the matrices",
      "Perform  matrix  addition",
      "Check  for saddle  point",
      "Find inverse  of the matrix  (if determinant  ≠ 0)",
      "Check  whether  the matrix  is a magic  square",
      "Display  results",
      "Stop"
    ],
    io: { input: "1 0 -2 3 1 -2 -5 -1 9 & 1 0 1 0 1 0 1 0 1", output: " " },
    conclusion: "Thus,  we have  learned  how to perform  basic  matrix  operations  using  C programming  and understood their practical applications.",
    code: `#include  <stdio.h> 
#include  <math.h>  
void cofactor(int  n, int a[n][n],  int c[n-1][n-1], int ai, int aj); 
void printm(int n, int a[n][n]){  
for (int i = 0; i < n; i++) 
{ 
for (int j = 0; j < n; j++){ 
printf("%d ",a[i][j]);  
} 
printf(" \n"); 
} 
} 
 
void printfm(int  n, float a[n][n]){ 
for (int i = 0; i < n; i++)  
{ 
for (int j = 0; j < n; j++){ 
printf("%f ",a[i][j]);  
} 
printf(" \n"); 
} 
} 
 
int Determinant(int  n, int a[n][n])  
{ 
int d = 0; 
if (n == 2) 
{ 
d = a[0][0]*a[1][1]  - a[0][1]*a[1][0];  
return  (d); 
} 
int c[n-1][n-1]; 
for (int i = 0; i < n; i++){ 
cofactor(n,a,c,i,0);  
d += pow( -1,i) * a[i][0]  * Determinant(n -1,c); 
} 
return  d; 
} 
 
void cofactor(int  n, int a[n][n],  int c[n-1][n-1], int ai, int aj) 
{ 
int ioff = 0; 
for (int i = 0; i < n-1; i++) 
{ \n
int joff = 0; 
if (i == ai){ 
ioff = 1;  
} 
for (int j = 0; j < n-1; j++){ 
if (j == aj){  
joff = 1; 
} 
c[i][j] = a[i + ioff][j  +joff];  
} 
} 
} 
 
void adjoint(int  n, int a[n][n],  float b[n][n]){ 
for (int i = 0; i < n; i++){  
for (int j = 0; j < n; j++){ 
int c[n -1][n-1]; 
cofactor(n,a,c,i,j);  
b[i][j]  = Determinant(n -1,c); 
} 
} 
} 
 
void inverse(int  n, int a[n][n],  float b[n][n]){ 
int d = Determinant(n,a);  
adjoint(n,a,b);  
for (int i = 0; i < n; i++){ 
for (int j = 0; j < n; j++){ 
b[n][n]  = b[n][n]  * d; 
} 
} 
} 
 
void inputmatrix(int  n, int a[n][n]){ 
for (int i = 0; i < n; i++){  
for (int j = 0; j < n; j++) 
{ 
scanf("%d",&a[i][j]);  
} 
} 
} 
 
void addmatrices(int  n, int a[n][n],  int b[n][n],  int c[n][n]){ 
for (int i = 0; i < n; i++){  
for (int j = 0; j < n; j++) 
{ 
c[i][j] = a[i][j]  + b[i][j];  
} \n
} 
} 
 
int saddlepoint(int  n, int a[n][n],  int *check){ 
for (int i = 0; i < n; i++){  
for (int j = 0; j < n; j++){ 
for (int k = 0; k < n; k++){  
if (a[i][j]  > a[i][k])  goto endofloop;  
} 
for (int k = 0; k < n; k++){  
if (a[i][j]  < a[k][j])  goto endofloop;  
} 
*check = 1; 
return  a[i][j]; 
endofloop:  
} 
} 
return  0; 
} 
 
int ismagicsquare(int  n, int a[n][n]){ 
for (int i = 0; i < n; i++){  
for (int j = 0; j < n; j++){ 
for (int k = 0; k < n; k++){ 
for (int l = 0; l < n; l++){ 
if (a[i][j]  == a[k][l]  && i != k && j != l){ 
return 0;  
} 
} 
} 
} 
int sum = 0; 
for (int j = 0; j < n; j++){ 
sum += a[i][j];  
} 
if (sum!=  15) return  0; 
sum = 0; 
for (int j = 0; j < n; j++){ 
sum += a[j][i];  
} 
if (sum!=  15) return  0; 
sum = 0; 
for (int j = 0; j < n; j++){ 
sum += a[j][j];  
} 
if (sum!=  15) return  0; 
} 
return  1; \n
} 
 
int main()  { 
int n;  
printf("Enter  Size of Matrices \n"); 
scanf("%d",&n);  
printf("Enter  Elements  of Matrix  A\n"); 
int a[n][n];  
inputmatrix(n,a);  
printf("Enter  Elements  of Matrix  B\n"); 
int b[n][n];  
inputmatrix(n,b);  
printf(" \n\nSum  of Matrix  A and B:\n"); 
int sum[n][n];  
addmatrices(n,a,b,sum); 
printm(n,sum);  
printf(" \n"); 
int saddlepointexists  = 0; 
int saddlepointn  = saddlepoint(n,  a, &saddlepointexists);  
if (saddlepointexists)  printf("Saddle  Point  of A:\n%d",saddlepointn); 
printf("A is %s Magic Square",ismagicsquare(n,a)?"a":"not a");  
float inv[n][n];  
if (Determinant(n,a) != 0){ 
inverse(n,a,inv); 
printf(" \n\nInverse  of A:\n"); 
printfm(n,inv);  
} 
}`
  },
  'A6': {
    id: 'A6',
    title: 'Assignment 6',
    ps: "Write  a C function  to compute  the factorial  of a number  with and without recursion.",
    objective: "To demonstrate  two different  approaches  for calculating  the factorial  of a number:  iterative (non-recursive) and recursive, showcasing the versatility of problem -solving methods in Programming.",
    algorithm: [
      "START",
      "Accept  number  n",
      "Iterate  i from 1 to n, and multiply  a product  variable  defined  originally  as 1 by the",
      "Display  product  as factorial",
      "STOP"
    ],
    io: { input: "4", output: "" },
    conclusion: "Thus,  we have  successfully  executed  factorial  of a number  with and without Recursion.",
    code: `#include  <stdio.h>  
 
int factrec(int  n){ 
if (n < 1) return  1; 
else return(n  * factrec(n -1)); 
} 
 
int factloop(int  n){ 
int f = 1;  
\n
for (int i = 1; i <= n; i++){ 
f *= i;  
} 
return  f; 
} 
 
int main()  { 
printf("Enter  a number  - "); 
int n;  
scanf("%d",&n);  
printf("Factorial  with recursion  - %d\nFactorial  without  recursion  - %d",factrec(n),factloop(n));  
}`
  },
  'A7': {
    id: 'A7',
    title: 'Assignment 7',
    ps: "Write  a C program  to accept  student  details  and display  their result using an array of structures.",
    objective: "To understand  the concept  of structures  in C. To learn  how to store  multiple  records  using  an array  of structures. To accept  and process  student  details  such  as name,  roll number,  and marks. To calculate total and percentage and display the result.",
    algorithm: [
      "START",
      "Accept  student  name,  roll no. and marks",
      "Store the accepted value in a struct",
      "Display details of student",
      "STOP"
    ],
    io: { input: "Om Nayak 91 728", output: "." },
    conclusion: "Thus, the C program successfully accepts student details using an array of structures  and displays  the calculated  result  including  total marks  and percentage.",
    code: `#include  <stdio.h>  
\n
struct  student{ 
int rollno;  
int marks;  
char name[99];  
}; 
 
int main()  { 
printf("Enter  Student  name,  marks  and roll number \n"); 
struct student s;  
fgets(s.name,  99 ,stdin);  
scanf("%d  %d",&s.marks,  &s.rollno);  
printf("Name  - %sRoll  Number  - %d\nMarks  - %d",s.name,s.rollno,s.marks);  
}`
  },
  'A8': {
    id: 'A8',
    title: 'Assignment 8',
    ps: "Write a program in C to accept marks of five courses of a student and compute the result. A student  is considered  PASS  if he/she  scores  40 marks  or more  in each  course.  If the student passes, calculate the aggregate percentage and assign the grade as follows: • Aggregate  ≥ 75% : Distinction • Aggregate  ≥ 60% and < 75% : First Division • Aggregate  ≥ 50% and < 60% : Second  Division • Aggregate  ≥ 40% and < 50% : Third  Division",
    objective: "• To understand  the use of conditional  statements  in C • To apply  logical  operators  for decision  making • To calculate  total,  percentage,  and grade  of a student • To enhance  problem -solving  skills  using  real-life scenarios",
    algorithm: [
      "START",
      "Accept  marks  of 5 courses",
      "Define  total marks  as sum of all marks",
      "It any of the marks  is below  40, display  FAIL  as the result",
      "Calculate Percentage as total marks divided by 5",
      "Define Grade as Distinction if percentage is over 75%, else First Division if",
      "Display all information",
      "STOP"
    ],
    io: { input: "85 74 93 56 68", output: "" },
    conclusion: "Thus,  the program  to calculate  student  result  and grade  based  on marks  was successfully implemented using C programming. This program demonstrates the effective use of conditional statements, logical operators, and arithmetic operations.",
    code: `#include  <stdio.h>  
 
int main(){  
printf("Enter  Marks  in 5 Subjects  : "); 
int m1,m2,m3,m4,m5;  
scanf("%d  %d %d %d %d",&m1,&m2,&m3,&m4,&m5); 
int t = m1+m2+m3+m4+m5;  
float p = t / 5.0; 
int pass = 1;  
if (m1 < 40) pass  = 0; 
if (m2 < 40) pass  = 0; 
if (m3 < 40) pass  = 0; 
if (m4 < 40) pass  = 0; 
if (m5 < 40) pass  = 0; 
printf("Total  Marks  = %d\nPercentage  = %f%\nResult:  %s",t,p,(pass?"PASS":"FAIL")); 
if (pass){  
printf(" \nGrade:  "); 
if (p >= 75) printf("Distinction");  
else if (p >= 60) printf("First Division"); 
else if (p >= 50) printf("Second  Division"); 
else printf("Third Division");  
} 
}`
  },
  'A9': {
    id: 'A9',
    title: 'Assignment 9',
    ps: "Write  a program  in C to check  whether  the given  number  is an Armstrong  number  or not. An Armstrong  number  is an integer  with three  digits  such  that the sum of the cubes  of its digits is equal to the number itself. Example:  371",
    objective: "• To understand  the concept  of Armstrong  numbers. • To practice  arithmetic  operations  in C. • To develop  logical  thinking  using  loops  and conditional  statements.",
    algorithm: [
      "START",
      "Accept  number  n",
      "Iterate  through  n to find digits  d",
      "Iterate  through  n to find sum of all digits  raised  to d",
      "If sum equals  n, display  armstrong  number  else display  not armstrong  number",
      "STOP"
    ],
    io: { input: "153", output: " " },
    conclusion: "Thus,  we have  successfully  written  a C program  to check  whether  a given  number  is an Armstrong number using loops and arithmetic operations.",
    code: `#include  <stdio.h> 
#include  <math.h>  
 
int isArmstrong(int  n){ 
int tn = n;  
int d = 0; 
while(tn  > 0){ 
tn /= 10; 
d++; 
} 
tn = n; 
int s = 0; 
while(tn  > 0){ 
s += pow(tn%10,d); 
tn /= 10;  
} 
if (s == n) return  1; 
return 0;  
} 
 
int main(){ 
int n;  
printf("Enter  number  : "); 
scanf("%d",&n);  
printf(isArmstrong(n)?"Armstrong  Number":"Not  Armstrong  Number");  
}`
  },
  'A10': {
    id: 'A10',
    title: 'Assignment 10',
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
    code: `#include<stdio.h> 
#include<math.h>  
 
long long fact(long  long n){ 
if (n == 1) return n; 
return (n * fact(n -1)); 
} 
\n
int main(){ 
char op; 
printf("Enter  Operation: \n+, -, *, /, ^, !\n"); 
scanf("%c",&op);  
int a,b; 
if (op != '!'){ 
printf("Enter  2 numbers  : "); 
scanf("%d %d",&a,&b);  
} 
else{  
printf("Enter  1 number  : "); 
scanf("%d",&a);  
} 
switch(op){ 
case  '+': 
printf("%d",a+b); 
break;  
case  '-': 
printf("%d",a -b); 
break;  
case  '*': 
printf("%d",a*b); 
break;  
case  '/': 
printf("%d",a/b); 
break;  
case  '^': 
printf("%f",pow(a,b)); 
break;  
case  '!': 
printf("%d",fact(a)); 
break;  
} 
}`
  },
  'A11': {
    id: 'A11',
    title: 'Assignment 11',
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
    code: `#include  <stdio.h> 
#include  <math.h>  
 
int isPrime(int  n){ 
for (int i = 2; i <= sqrt(n);  i++){ 
if (n%i==0){  
return  0; 
} 
} 
return  1; 
} 
 
int fact(int  n){ 
if (n > 0){  
return  n * fact(n -1); 
} 
return  1; 
} 
 
int main(){  
printf("Enter  a number  - "); 
int n;  
scanf("%d",&n);  
printf("Square  Root  - %f\nSquare  of the number  - %d\nCube  of the number  - %d\nIs 
number Prime - %s\nFactorial of number - %d\nPrime Factors of the number - 
",sqrt(n),n*n,n*n*n,(isPrime(n)?"Yes":"No"),fact(n));  
 
while  (n > 1){ 
for (int i = 2; i <= n; i++){ 
if (n%i==0){  
printf("%d  ", i); 
n/=i; 
break;  
} 
} 
} 
}`
  },
  'A12': {
    id: 'A12',
    title: 'Assignment 12',
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
int GCD(int  a, int b){ 
if (b == 0) return a; 
return(GCD(b,  a%b));  
} 
 
int main()  { 
printf("Enter  2 numbers  - "); 
int a, b;  
\n
scanf("%d %d",&a, &b); 
printf("GCD  - %d", GCD(a,b));  
}`
  },
  'A13': {
    id: 'A13',
    title: 'Assignment 13',
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
    code: `#include  <stdio.h>  
 
int reverse(int  n){ 
int m = 0; 
while (n > 0){  
m = 10*(m)  + n%10;  
n/=10;  
} 
return  m; 
} 
\n
int main()  { 
printf("Enter  a number  - "); 
int n;  
scanf("%d",&n);  
printf("Reverse  number  - %d", reverse(n));  
}`
  },
  'A14': {
    id: 'A14',
    title: 'Assignment 14',
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
    code: `#include  <stdio.h> 
#include  <math.h>  
 
 
int bintodec(int  b, int n){ 
if (b == 0) return 0;  
return  b%10  * pow(2,n)  + bintodec(b/10,++n);  
} 
 
int main()  { 
\n
int n; 
printf("Enter  Binary  Number  - "); 
scanf("%d", &n);  
printf("Decimal  Number  - %d",bintodec(n,0));  
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
#include  <stdlib.h> 
#include <time.h>  
\n
int main() { 
srand(time(NULL));  
printf("Enter  number  of numbers  - "); 
int n;  
scanf("%d",&n);  
for (int i = 0; i < n; i++){ 
printf("%d \n",rand());  
} 
}`
  },
  'A16': {
    id: 'A16',
    title: 'Assignment 16',
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
    code: `#include  <stdio.h> 
int main() {  
\n
printf("Enter  size of array  - "); 
int n;  
scanf("%d",&n); 
int A[n];  
printf("Enter  elements  of array \n"); 
for (int i = 0; i < n; i++){  
scanf("%d",&A[i]);  
} 
int ODD[n],  EVEN[n];  
int oc = 0, ec = 0; 
for (int i = 0; i < n; i++){ 
if (A[i] % 2 != 0) ODD[oc++]  = A[i]; 
else EVEN[ec++]  = A[i]; 
} 
printf("ODD  - "); 
for (int i = 0; i < oc; i++){ 
printf("%d ",ODD[i]);  
} 
printf(" \nEVEN  - "); 
for (int i = 0; i < ec; i++){ 
printf("%d  ",EVEN[i]);  
} 
}`
  },
  'A17': {
    id: 'A17',
    title: 'Assignment 17',
    ps: "To accept  the number  of terms  and find the sum of the sine series.",
    objective: "• To understand  the concept  of mathematical  series  in programming. • To implement  sine series  using  C programming. • To practice  loops  and arithmetic  operations. • To learn  the use of factorial  and power  calculations  in C.",
    algorithm: [
      
    ],
    io: { input: "1 5", output: "" },
    conclusion: "Thus,  the C program  successfully  calculates  the sum of the sine series  for the given  number of terms.",
    code: `#include  <stdio.h> 
#include  <math.h>  
 
float fact(int  n){ 
if (n > 0){  
return  n * fact(n -1); 
} 
return  1; 
} 
 
int main()  { 
float x; 
int n;  
printf("Enter  x (in radians)  : "); 
scanf("%f",&x);  
printf("Enter  number  of terms  : "); 
scanf("%d",&n);  
float sum = 0; 
for (int i = 1; i <= n; i++){ 
sum += pow( -1,i+1)  * (float)pow(x,((2*i) -1))/fact((2*i) -1); 
} 
printf("Sum  = %f",sum);  
} \n`
  },
  'A18': {
    id: 'A18',
    title: 'Assignment 18',
    ps: "Write  a C program  that accepts  a string  from the user and performs  the following  string operations: i) Calculate  length  of string ii) String  reversal iii) Equality  check  of two strings iv) Check  palindrome v) Check  substring.",
    objective: "• To understand  basic  string  operations  in C. • To learn  how to manipulate  strings  using  loops  and functions. • To perform  comparison,  reversal,  and substring  checking. • To check  whether  a string  is a palindrome.",
    algorithm: [
      
    ],
    io: { input: "ABC ABC", output: "" },
    conclusion: "Thus,  the C program  successfully  performs  different  string  operations  such  as length calculation, reversal, equality check, palindrome check, and substring detection.",
    code: `#include <stdio.h> 
#include  <string.h>  
 
void reverse(int  n, char ver[n],  char rev[n]){ 
for (int i = 0; i < n -1; i++){  
rev[n  - i - 2] = ver[i];  
} 
rev[n -1] = 0; 
} 
 
int main() { 
char A[50];  
printf("Enter  String  A: "); 
fgets(A, 50, stdin);  
char revA[strlen(A)]; 
reverse(strlen(A),A,revA); 
char B[50];  \n
printf("Enter  String  B: "); 
fgets(B, 50, stdin);  
printf("Length  of A = %d\nReversed  A is %s\nA and B are %s\nA is %sa palindrome \nB is %sa substring  of A",strlen(A),revA,(strcmp(A,B)  == 0?"Same":"Different"),(strcmp(A,revA)  == 0?"":"not "), (strstr(A,B) != NULL?"":"not "));  
}`
  },
  'A19': {
    id: 'A19',
    title: 'Assignment 19',
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
#include  <string.h>  
 
struct employee{ 
char name[50];  
char designation[50]; 
char gender;  
int date; 
int salary;  
}; 
 
int main()  { 
printf("Enter  number  of employees:  "); 
int n;  
scanf("%d",&n);  
struct  employee  employees[n]; 
int highsalary = 0;  
int male  = 0; 
for (int i = 0; i < n; i++){ \n
scanf("%c", (char *) stdin); 
printf("Enter name: "); 
fgets(employees[i].name,  50, stdin); 
printf("Enter designation: ");  
fgets(employees[i].designation, 50, stdin); 
printf("Enter  gender,  date of joining  and salary:  "); 
scanf("%c  %d %d",&employees[i].gender,&employees[i].date,  &employees[i].salary); 
if (employees[i].gender == 'm') male++;  
if (employees[i].salary  > 10000)  highsalary++;  
} 
printf("Male  Employees  = %d\nFemale  Employees  = %d\nEmployees  with salary  over 10000 = %d \nEmployees with designation AsstManager: \n",male,n -male,highsalary);  
for (int i = 0; i < n; i++){ 
if (strcmp(employees[i].designation,"AsstManager \n") == 0) 
printf("%s",employees[i].name);  
} 
}`
  },
  'A20': {
    id: 'A20',
    title: 'Assignment 20',
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
    code: `#include  <stdio.h>  
 
void swapvar(int  a, int b){ 
int c = b;  
b = a; 
a = c; 
printf("After  swapping  without  pointers: \na = %d, b = %d\n",a,b);  
} 
 
void swappoint(int  *a, int *b){ 
int d;  
int *c = &d; 
*c = *b; 
*b = *a; 
*a = *c; 
printf("After  swapping  with pointers: \na = %d, b = %d\n",*a,*b);  
} 
 
int main()  { \n
printf("Enter  two numbers:  "); 
int a,b;  
scanf("%d  %d",&a,&b); 
swapvar(a,b); 
swappoint(&a,&b);  
}`
  },
  'A21': {
    id: 'A21',
    title: 'Assignment 21',
    ps: "Write  a C program  to copy  contents  of one file to another  using  file handling.",
    objective: `• To understand  the concept  of file handling  in the C programming  language.  
• To learn  how to read data from a file and write  data into another  file. 
• To implement  file copy  operation  using  standard  file handling  functions.`,
    algorithm: [
      
    ],
    io: { input: "", output: "" },
    conclusion: `Thus,  the C program  successfully  demonstrates  file handling  operations  by copying  the 
contents of one file into another using file handling functions.`,
    code: `#include  <stdio.h>  
 
int main()  { 
FILE *f1 = fopen("FileA.txt","r"); 
FILE  *f2 = fopen("FileB.txt","w"); 
char content[200];  
while  (fgets(content,  200, f1) != NULL) 
fprintf(f2,"%s",content);  
fclose(f1); 
fclose(f2);  
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
#include  <string.h>  
 
void reverse(int  n, char ver[n],  char rev[n]){ 
for (int i = 0; i < n -1; i++){  
rev[n  - i - 2] = ver[i];  
} 
rev[n -1] = 0; 
} 
 
int main() { 
char A[50];  
printf("Enter  String  A: "); 
fgets(A, 50, stdin);  
char B[50];  
printf("Enter  String  B: "); 
fgets(B, 50, stdin);  
char revA[strlen(A)]; 
reverse(strlen(A),A,revA); 
char revB[strlen(B)];  \n
reverse(strlen(B),B,revB);  
printf("1  - Length \n2 - Copy \n3 - Compare \n4 - Concat \n5 - Reverse \nEnter  choice:  "); 
int c;  
scanf("%d",&c); 
switch(c){  
case  1: 
printf("Length  of A - %d\nLength  of B - %d",strlen(A),strlen(B)); 
break;  
case  2: 
strcpy(B,A);  
printf("A  - %s\nB - %s",A,B); 
break;  
case  3: 
printf("A  and B are %s",(strcmp(A,B)  == 0?"Same":"Different")); 
break;  
case  4: 
strcat(A,B); 
printf("A  - %s",A); 
break;  
case  5: 
printf("A  - %s, B - %s",revA,revB); 
break;  
default:  
printf("Error");  
} 
}`
  }
};

// Attach simulations back to the first 4 if they exist
if (assignmentData['A1']) assignmentData['A1'].sim = <LeapYearSim />;
if (assignmentData['A2']) assignmentData['A2'].sim = <CalculatorSim />;
if (assignmentData['A3']) assignmentData['A3'].sim = <TableSim />;
if (assignmentData['A4']) assignmentData['A4'].sim = <SalarySim />;













