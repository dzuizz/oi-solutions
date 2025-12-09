// https://orac2.info/problem/99/
#include<bits/stdc++.h>
using namespace std;
int main(){
  ios_base::sync_with_stdio(0); cin.tie(0); cout.tie(0);
  int a[3],res[3]{};
  for(int i:{0,1,2}) cin>>a[i];
  while(1){
    int mxi=0,mdi,mni=0;
    for(int i:{1,2}){
      if(a[i]>=a[mxi]) mxi=i;
      if(a[i]<a[mni]) mni=i;
    }
    mdi=3-mxi-mni;
    if(!a[mdi]) break;
    --a[mdi],--a[mxi],++res[3-mdi-mxi];
  }
  for(int i:{0,1,2}) cout<<res[i]<<" ";
  cout<<'\n';
  return 0;
}

