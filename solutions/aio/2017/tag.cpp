// https://orac2.info/problem/225/
#include<bits/stdc++.h>
using namespace std;
int main(){
  ios_base::sync_with_stdio(0); cin.tie(0); cout.tie(0);
  int n,m; cin>>n>>m;
  int cnt[2]={1,1};
  int t[n]; t[0]=0,t[1]=1;
  for(int i=0;i<m;++i){
    int a,b; cin>>a>>b;
    ++cnt[t[--b]=t[--a]];
  }
  cout<<cnt[0]<<" "<<cnt[1]<<'\n';
  return 0;
}

