// https://orac2.info/problem/4/
#include<bits/stdc++.h>
using namespace std;
int main(){
  ios_base::sync_with_stdio(0); cin.tie(0); cout.tie(0);
  int ix,iy,id; cin>>ix>>iy>>id;
  int cx,cy,cd; cin>>cx>>cy>>cd;
  double d=sqrt((ix-cx)*(ix-cx)+(iy-cy)*(iy-cy));
  cout<<(id+cd<ceil(d) || id>floor(d)+cd || cd>floor(d)+id?"no\n":"yes\n");
  return 0;
}

