// https://orac2.info/problem/267/
#include<bits/stdc++.h>
using namespace std;
int main(){
  ios_base::sync_with_stdio(0); cin.tie(0); cout.tie(0);
  int r,c; cin>>r>>c;
  bool g[r][c];
  for(int i=0;i<r;++i) for(int j=0;j<c;++j){
    char c; cin>>c;
    g[i][j]=(c=='#');
  }
  pair<int,int> s,e;
  int mx=0;
  for(int i=0;i<r;++i){
    pair<int,int> cur={i,-1};
    for(int j=0;j<c;++j){
      if(g[i][j]) cur={i,j};
      else if(j-cur.second>mx)
        s={cur.first+1,cur.second+2},e={i+1,j+1},mx=j-cur.second;
    }
  }
  for(int j=0;j<c;++j){
    pair<int,int> cur={-1,j};
    for(int i=0;i<r;++i){
      if(g[i][j]) cur={i,j};
      else if(i-cur.first>mx)
        s={cur.first+2,cur.second+1},e={i+1,j+1},mx=i-cur.first;
    }
  }
  cout<<s.first<<" "<<s.second<<" "<<e.first<<" "<<e.second<<'\n';
  return 0;
}

