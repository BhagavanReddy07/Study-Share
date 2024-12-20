import java.util.Scanner;
public class panagram {
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        String s1="abcdefghijklmnopqrstuvwxyz";
        String s2=sc.nextLine();
        char[] a=s1.toCharArray();
        char[] b=s2.toCharArray();
        int count=0;
        for(int i=0;i<s1.length();i++)
        {
            for(int j=0;j<s2.length();j++)
            if(a[i]==b[j])
            {
                count++;
                break;
            }
        }
        System.out.println(count);
        if(count==26)
        {
            System.out.println("panagram");
        }
        else
        {
            System.out.println("not");
        }
    }
}
