// https://codebreaker.xyz/problem/area_noi
#include<bits/stdc++.h>
using namespace std;
int main(){
  ios_base::sync_with_stdio(0); cin.tie(0); cout.tie(0);
  int n,mx=0; cin>>n;
  for(int i=0,a,b;i<n;++i){
    cin>>a>>b;
    mx=max(mx,a*b);
  }
  cout<<mx<<'\n';
  return 0;
}

