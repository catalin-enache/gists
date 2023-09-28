#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct  {
    int id;
    char name[20];
    float salary;
} Employee;

int main()
{

    char str2[] = "Hello";
    char *str = "Hello there";
    strcpy(str2, "Hi");
    printf("%s\n", str2);
//    free(str);

    Employee e = {123, "John", 5000};
    Employee f = {.id=111, .name="L", .salary=30};

    printf("%10s %10d %10.3f\n", e.name, e.id, e.salary);
    printf("%10s %10d %10.3f\n", f.name, f.id, f.salary);

    return 0;
}