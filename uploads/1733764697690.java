import java.util.Scanner;
public class anagram {
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        String s1=sc.next();
        String s2=sc.next();
        int count=0;
        char[] a=s1.toCharArray();
        char[] b=s2.toCharArray();
        if(s1.length()==s2.length())
        {
            for(int i=0;i<s1.length();i++)
            {
                for(int j=0;j<s1.length();j++)
                {
                    if(a[i]==b[j])
                    {
                        count++;
                    }
                }
            }

        }
        if(count==s1.length())
        {
            System.out.println("anagram");
        }
        else
        {
            System.out.println("not");
        }
    }
}
