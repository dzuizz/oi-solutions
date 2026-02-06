// https://orac2.info/problem/121/
#include<bits/stdc++.h>
using namespace std;
int main(){
  ios_base::sync_with_stdio(0); cin.tie(0); cout.tie(0);
  int t,ans=0; cin>>t;
  for(int k:{100,20,5,1})
    ans+=t/k,t%=k;
  cout<<ans<<'\n';
  return 0;
}

