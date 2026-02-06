// https://orac2.info/problem/98/
#include<bits/stdc++.h>
using namespace std;
int res[2010][2010];
int main(){
  ios_base::sync_with_stdio(0); cin.tie(0); cout.tie(0);
  int i=0,j=0,_p=0;
  map<pair<int,int>,int> mp;
  for(int k=1;k<=2001;++k){
    for(int l=0;l<k;++l)
      res[i+1000][j+1000]=_p++,(k&1?++i:--i);
    for(int l=0;l<k;++l)
      res[i+1000][j+1000]=_p++,(k&1?++j:--j);
  }
  int x,y; cin>>x>>y;
  cout<<res[x+1000][y+1000]<<'\n';
  return 0;
}

