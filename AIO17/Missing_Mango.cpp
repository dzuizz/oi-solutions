// https://orac2.info/problem/204/
#include<bits/stdc++.h>
using namespace std;
int main(){
  ios_base::sync_with_stdio(0); cin.tie(0); cout.tie(0);
  int a,b,c,d; cin>>a>>b>>c>>d;
  for(int k:{a+c,a-c,b+d,b-d}){
    if(abs(k-a)==c && abs(k-b)==d){
      cout<<k<<'\n';
      break;
    }
  }
  return 0;
}

