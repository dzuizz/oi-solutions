// https://orac2.info/problem/168/
#include<bits/stdc++.h>
using namespace std;
int main(){
  ios_base::sync_with_stdio(0); cin.tie(0); cout.tie(0);
  int n,l; cin>>n>>l;
  int pos[n]; for(auto&x:pos) cin>>x;
  int ord[n]; for(auto&x:ord) cin>>x,--x;
  int lf=1,rg=l,p=ord[0];
  for(int _=1,i=ord[_];_<n;p=i,i=ord[++_]){
    int m=(pos[p]+pos[i])>>1;
    if(pos[i]>pos[p]) rg=min(rg,m);
    else lf=max(lf,m);
  }
  cout<<(lf>rg?-1:lf)<<'\n';
  return 0;
}

