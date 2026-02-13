// https://codebreaker.xyz/problem/burgers
#include<bits/stdc++.h>
using namespace std;
int main(){
  ios_base::sync_with_stdio(0); cin.tie(0); cout.tie(0);
  int n; cin>>n;
  int x[n],a[2][n];
  for(auto&e:x) cin>>e;
  for(int i:{0,1}) for(auto&x:a[i])
    cin>>x;
  int l=0,r=1e9+5,m;
  while(l<r){
    m=(l+r+1)>>1;
    int cnt[2]{m,m},mn=0,mx=1;
    bool f=1;
    for(int i=0;i<n && f;++i){
      if(a[mn][i]>a[mx][i]) swap(mn,mx);
      if(x[i]<(long long)a[mn][i]*m) f=0;
      else if(a[mn][i]!=a[mx][i])
        cnt[mn]=min(cnt[mn],m),
        cnt[mx]=min((long long)cnt[mx],(x[i]-(long long)a[mn][i]*m)/(a[mx][i]-a[mn][i]));
    }
    if(f && cnt[0]+cnt[1]>=m) l=m;
    else r=m-1;
  }
  cout<<l<<'\n';
  return 0;
}

